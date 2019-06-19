import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {ObjectMetadata} from "firebase-functions/lib/providers/storage";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

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


exports.generateResponsiveContent = functions.runWith({timeoutSeconds: 540}).storage.object().onFinalize(async (file: ObjectMetadata) => {

    console.log(`file: ${JSON.stringify(file)}`);

    if (!file.name) {
        console.error(`filePath is undefined. file: ${JSON.stringify(file)}`)
    }
    const filePath = <string>file.name;

    if (filePath.includes('transformed')) {
        return;
    }

    if (file.contentType === 'video/mp4') {
        await handleVideoConversion(file, filePath);
    }
});

async function handleVideoConversion(file: ObjectMetadata, filePath: string) {

    const tempFilePath = path.join(os.tmpdir(), filePath);
    await bucket.file(filePath).download({destination: tempFilePath});
    console.log('Image downloaded locally to', tempFilePath);
// Generate a thumbnail using ImageMagick.
// Once the thumbnail has been uploaded delete the local file to free up disk space.

    await Promise.all([
        uploadInSize(tempFilePath, 's_' + filePath, 560),
        // uploadInSize(remoteReadStream, getWriteStream('m_' + filePath), 960),
        // uploadInSize(remoteReadStream, getWriteStream('l_' + filePath), 1200)
    ]);


    return fs.unlinkSync(tempFilePath);
}


// ffmpeg -ss 00:00:10 -i philips_formula1.mkv -y -r 24 -s 1280x720 -c:v libx264 -b:v 2500k -c:a aac -b:a 128k
function uploadInSize(filePath: string, uploadPath: string, width: number) {
    const tempFilePath = path.join(os.tmpdir(), uploadPath);

    return new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .fps(24)
            .audioCodec("libvorbis")
            .videoCodec("libvpx-vp9")
            .size(`${width}x?`).aspect('4:3').autopad('black')
            .format('webm')
            // .outputOptions('-movflags +faststart')
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