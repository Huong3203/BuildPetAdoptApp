// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "buildpetadoptapp.firebaseapp.com",
  projectId: "buildpetadoptapp",
  storageBucket: "buildpetadoptapp.firebasestorage.app",
  messagingSenderId: "726305105918",
  appId: "1:726305105918:web:d6ed88cc82c7a2740502af",
  measurementId: "G-FE0JEL9DH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);
//const analytics = getAnalytics(app);