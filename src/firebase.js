// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0u5EMXxD4aL2PIoHCgseMoS8BMEwjyLc",
  authDomain: "e-commerce-34ce9.firebaseapp.com",
  projectId: "e-commerce-34ce9",
  storageBucket: "e-commerce-34ce9.appspot.com",
  messagingSenderId: "1090293564059",
  appId: "1:1090293564059:web:6b62c31181eee1b22d3c3e",
  measurementId: "G-YS16VM0JZ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
