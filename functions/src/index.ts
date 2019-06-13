import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.images = functions.https.onRequest(async (request: any, response: any) => {
    const snapshot = await firestore.collection('images').get();
    const document = snapshot.docs.map((doc: any) => doc.data());
    response.send(document);
});


exports.generateThumbnail = functions.storage.object().onFinalize(async (object: any) => {
    // ...
});