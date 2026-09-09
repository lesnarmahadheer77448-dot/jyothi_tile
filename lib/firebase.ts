import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU8q6nYmp8aYDP4DXpOyhjRDEF-uPT9QQ",
  authDomain: "jyothi-4abe7.firebaseapp.com",
  projectId: "jyothi-4abe7",
  storageBucket: "jyothi-4abe7.firebasestorage.app",
  messagingSenderId: "811628054252",
  appId: "1:811628054252:web:cb8a89efacd68c7cddc7c9",
  measurementId: "G-DM5BQ67978"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization in Next.js fast refresh)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
