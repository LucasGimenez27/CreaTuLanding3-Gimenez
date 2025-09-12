
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "final-react-lgez.firebaseapp.com",
  projectId: "final-react-lgez",
  storageBucket: "final-react-lgez.firebasestorage.app",
  messagingSenderId: "240436679166",
  appId: "1:240436679166:web:e69e016e684207ba0370af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app)





