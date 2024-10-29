// Node.js server code or Firebase Cloud Function

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const uid = "6RIpaDid5meWlMxKMFAiF5lADau1"; // The UID of the user

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Custom claims set for user:', uid);
  })
  .catch((error) => {
    console.error('Error setting custom claims:', error);
  });
