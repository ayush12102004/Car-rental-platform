const admin = require('firebase-admin');
// Service account key should be in the root directory relative to backend
// e.g. e:/car rental platform/serviceAccountKey.json
// const serviceAccount = require('../../serviceAccountKey.json');

// Check if serviceAccountKey exists or use environment variables
// For now, we will use a placeholder or check for file existence
let serviceAccount;
try {
    serviceAccount = require('../../serviceAccountKey.json');
} catch (e) {
    console.warn("Warning: serviceAccountKey.json not found in project root. Firebase Admin will not work until it is added.");
}

if (serviceAccount) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // storageBucket: "your-project-id.appspot.com" 
    });
}

const db = serviceAccount ? admin.firestore() : { collection: () => ({ doc: () => { } }) }; // Mock if not init
const auth = serviceAccount ? admin.auth() : {};
const storage = serviceAccount ? admin.storage() : {};

module.exports = { admin, db, auth, storage };
