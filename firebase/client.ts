import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { get } from "http";
const firebaseConfig = {
  apiKey: "AIzaSyBTJm7rQOWIKQVZgbijy-b5kBCRdg5mUzw",
  authDomain: "console-b3ae1.firebaseapp.com",
  projectId: "console-b3ae1",
  storageBucket: "console-b3ae1.firebasestorage.app",
  messagingSenderId: "456964218639",
  appId: "1:456964218639:web:42215b0b83198c2beae87a",
  measurementId: "G-QNN9MQ9NCD"
};

// Initialize Firebase
const app =!getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app); 
export const db = getFirestore(app); 