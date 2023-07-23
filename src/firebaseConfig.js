import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3rEKdnQ9gTgLwe3thlHjH0C25oHHzy0E",
  authDomain: "react-crud-project-aaa6b.firebaseapp.com",
  projectId: "react-crud-project-aaa6b",
  storageBucket: "react-crud-project-aaa6b.appspot.com",
  messagingSenderId: "910174902950",
  appId: "1:910174902950:web:e8f267c5e217935e06b267",
  measurementId: "G-W055054SEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;