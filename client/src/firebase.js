// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mearn-estate-fde6f.firebaseapp.com",
  projectId: "mearn-estate-fde6f",
  storageBucket: "mearn-estate-fde6f.appspot.com",
  messagingSenderId: "576312640873",
  appId: "1:576312640873:web:9f896db6f02e1ae1fa69f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);