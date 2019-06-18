import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {ObjectMetadata} from "firebase-functions/lib/providers/storage";
import {Readable, Writable} from "stream";

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


exports.generateThumbnail = functions.storage.object().onFinalize(async (file: ObjectMetadata) => {

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
    const remoteWriteStream = bucket.file('transformed/' + filePath)
        .createWriteStream({
            metadata: {
                metadata: file.metadata, // You may not need this, my uploads have associated metadata
                contentType: 'video/mp4', // This could be whatever else you are transcoding to
            },
        });

    const remoteReadStream = bucket.file(filePath).createReadStream();

    await uploadInSize(remoteReadStream, remoteWriteStream);
}

function uploadInSize(readStream: Readable, writeStream: Writable) {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(readStream)
            .outputOptions('-c:v copy')
            .outputOptions('-c:a aac')
            .outputOptions('-b:a 160k')
            .outputOptions('-f mp4')
            .outputOptions('-preset fast')
            .outputOptions('-movflags frag_keyframe+empty_moov')
            .on('start', (cmdLine: string) => {
                console.log('Started ffmpeg with command:', cmdLine);
            })
            .on('end', () => {
                console.log('Successfully re-encoded video.');
                resolve();
            })
            .on('error', (err: any, stdout: string, stderr: string) => {
                console.error('An error occured during encoding', err.message);
                console.error('stdout:', stdout);
                console.error('stderr:', stderr);
                reject(err);
            })
            .pipe(writeStream, {end: true});
    })
}