import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

connectFirestoreEmulator(firestore, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");
