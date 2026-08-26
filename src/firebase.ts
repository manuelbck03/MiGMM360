import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBOL-tNifUMjztt8ptpWAhnwYaY1SudUZQ',
  authDomain: 'migmm360.firebaseapp.com',
  projectId: 'migmm360',
  storageBucket: 'migmm360.firebasestorage.app',
  messagingSenderId: '182540192770',
  appId: '1:182540192770:web:c218b454a5d3a8b082ab1b',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
