// firebase-admin.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./netset-sample-firebase-adminsdk-f676y-d5b9e6954d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
