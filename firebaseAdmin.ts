import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const servieAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(servieAccount),
  });
}

const adminDB = admin.firestore();

export { adminDB };
