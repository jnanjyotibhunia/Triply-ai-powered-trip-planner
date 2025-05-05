// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgQ-EbsRW7Pf3a0cIQ4eFx_exu4xeuOmE",
  authDomain: "ai-trip-planner-b85f1.firebaseapp.com",
  projectId: "ai-trip-planner-b85f1",
  storageBucket: "ai-trip-planner-b85f1.firebasestorage.app",
  messagingSenderId: "334965391398",
  appId: "1:334965391398:web:ddb4c8ca06ecfd5d74e6e7",
  measurementId: "G-E0GXEK99KF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);