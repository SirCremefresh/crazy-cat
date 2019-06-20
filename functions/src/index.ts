import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {ObjectMetadata} from "firebase-functions/lib/providers/storage";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

const spawn = require('child-process-promise').spawn;

const uuidv4 = require('uuid/v4');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');


ffmpeg.setFfmpegPath(ffmpegPath);

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
const bucket = admin.storage().bucket();

exports.media = functions.https.onRequest(async (request: any, response: any) => {
    response.set('Access-Control-Allow-Origin', '*');

    if (request.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        response.set('Access-Control-Allow-Methods', 'GET');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.set('Access-Control-Max-Age', '3600');
        response.status(204).send('');
        return;
    }

    const snapshot = await firestore.collection('media').where('active', '==', true).get();

    const document = snapshot.docs.map((doc: any) => doc.data());
    response.send(document);
});


exports.generateResponsiveContent = functions.runWith({
    timeoutSeconds: 540,
    memory: '1GB'
}).storage.object().onFinalize(async (file: ObjectMetadata) => {
    if (!file.name) {
        console.error(`filePath is undefined. file: ${JSON.stringify(file)}`)
    }
    const filePath = <string>file.name;

    if (filePath.includes('transformed')) {
        return;
    }

    const tempFilePath = path.join(os.tmpdir(), filePath);
    await bucket.file(filePath).download({destination: tempFilePath});

    let fileUrls;
    let type: string;

    if (file.contentType === 'video/mp4') {
        console.log("received video");
        type = 'video';
        fileUrls = await handleVideoConversion(tempFilePath);
    } else if (file.contentType.startsWith("image")) {
        console.log("received image");
        type = 'image';
        fileUrls = await handleImageConversion(tempFilePath);
    } else {
        console.info("unsupported contentType: ", file.contentType);
        return;
    }


    console.log('saving media information to firestore');
    firestore.collection('media').doc().set({
        active: false,
        name: filePath,
        type,
        fileUrls,
        likes: 0,
        license: '',
        description: ''
    });

    fs.unlinkSync(tempFilePath);
    return;
});


async function handleVideoConversion(tempFilePath: string) {
    const [sUrl, mUrl, lUrl] = await Promise.all([
        uploadVideoInSize(tempFilePath, 560),
        uploadVideoInSize(tempFilePath, 960),
        uploadVideoInSize(tempFilePath, 1200)
    ]);
    return {
        s: sUrl,
        m: mUrl,
        l: lUrl
    }
}

async function handleImageConversion(tempFilePath: string) {
    const [sUrl, mUrl, lUrl] = await Promise.all([
        uploadImageInSize(tempFilePath, 560),
        uploadImageInSize(tempFilePath, 960),
        uploadImageInSize(tempFilePath, 1200)
    ]);
    return {
        s: sUrl,
        m: mUrl,
        l: lUrl
    }
}

async function uploadImageInSize(filePath: string, width: number) {
    const height = width / 5 * 4;
    const uploadPath = uuidv4() + '.png';
    const tempFilePath = path.join(os.tmpdir(), uploadPath);

    await spawn('convert', [filePath, `-resize`, `${height}x${width}`, `-background`, `black`, `-gravity`, `center`, `-extent`, `${height}x${width}`, tempFilePath]);

    console.log('Thumbnail created at', tempFilePath);
    const fullUploadPath = 'transformed/' + uploadPath;

    await bucket.upload(tempFilePath, {
        destination: fullUploadPath,
        metadata: {
            contentType: 'image/png',
        },
        resumable: false,
        predefinedAcl: 'publicRead',
    });
    const file = await bucket.file(fullUploadPath);
    const metaData = await file.getMetadata();
    const url = metaData[0].mediaLink;
    console.log(`url: ${url}`);
    fs.unlinkSync(tempFilePath);
    return url;
}


function uploadVideoInSize(filePath: string, width: number) {
    const uploadPath = uuidv4() + '.mp4';
    const tempFilePath = path.join(os.tmpdir(), uploadPath);

    return new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .fps(24)
            .audioCodec("aac")
            .videoCodec("libx264")
            .size(`${width}x?`).aspect('5:4').autopad('black')
            .format('mp4')
            .outputOptions('-movflags +faststart')
            .on('start', (cmdLine: string) => {
                console.log('Started ffmpeg with command:', cmdLine);
            })
            .on('end', async () => {
                console.log('Successfully re-encoded video.');
                const fullUploadPath = 'transformed/' + uploadPath;
                await bucket.upload(tempFilePath, {
                    destination: fullUploadPath,
                    metadata: {
                        contentType: 'video/mp4',
                    },
                    resumable: false,
                    predefinedAcl: 'publicRead',
                });
                fs.unlinkSync(tempFilePath);
                const file = await bucket.file(fullUploadPath);
                const metaData = await file.getMetadata();
                const url = metaData[0].mediaLink;
                console.log(`url: ${url}`);
                resolve(url);
            })
            .on('error', (err: any, stdout: string, stderr: string) => {
                console.error('An error occured during encoding', err.message);
                console.error('stdout:', stdout);
                console.error('stderr:', stderr);
                reject(err);
            })
            .save(tempFilePath);
    })
}