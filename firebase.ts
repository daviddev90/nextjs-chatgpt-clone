import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD9vBZ22Rl0Y-44fSRQ3rUVH3eDctduFuA',
  authDomain: 'dongwon-jarvis.firebaseapp.com',
  projectId: 'dongwon-jarvis',
  storageBucket: 'dongwon-jarvis.appspot.com',
  messagingSenderId: '828552828131',
  appId: '1:828552828131:web:f31c04e238c1429bb5e1d6',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
