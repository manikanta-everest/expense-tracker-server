import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../firebase-expense-tracker.json'; 

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
  });
}

const db = admin.firestore();
export { db };