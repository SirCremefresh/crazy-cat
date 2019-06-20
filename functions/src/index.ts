import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {ObjectMetadata} from "firebase-functions/lib/providers/storage";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

const uuidv4 = require('uuid/v4');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');


ffmpeg.setFfmpegPath(ffmpegPath);

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
const bucket = admin.storage().bucket();

exports.images = functions.https.onRequest(async (request: any, response: any) => {
    const snapshot = await firestore.collection('images').get();
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

    const fileNames = {
        s: uuidv4() + '.mp4',
        m: uuidv4() + '.mp4',
        l: uuidv4() + '.mp4',
    };

    let type: string;

    if (file.contentType === 'video/mp4') {
        type = 'video';
        await handleVideoConversion(tempFilePath, fileNames);
    } else {
        type = 'image';
    }

    firestore.collection('media').doc().set({
        type,
        fileNames,
        likes: 0,
        license: ''
    });

    fs.unlinkSync(tempFilePath);
});

async function handleVideoConversion(tempFilePath: string, filenames: { s: string, m: string, l: string }) {
    await Promise.all([
        uploadInSize(tempFilePath, filenames.s, 560),
        uploadInSize(tempFilePath, filenames.m, 960),
        uploadInSize(tempFilePath, filenames.l, 1200)
    ]);
}


function uploadInSize(filePath: string, uploadPath: string, width: number) {
    const tempFilePath = path.join(os.tmpdir(), uploadPath);

    return new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .fps(24)
            .audioCodec("aac")
            .videoCodec("libx264")
            .size(`${width}x?`).aspect('4:3').autopad('black')
            .format('mp4')
            .outputOptions('-movflags +faststart')
            .on('start', (cmdLine: string) => {
                console.log('Started ffmpeg with command:', cmdLine);
            })
            .on('end', async () => {
                console.log('Successfully re-encoded video.');
                await bucket.upload(tempFilePath, {
                    destination: 'transformed/' + uploadPath,
                    metadata: {
                        contentType: 'video/mp4',
                    },
                    resumable: false
                });
                fs.unlinkSync(tempFilePath);
                resolve();
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