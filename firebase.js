// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7Mm4NmLYBBuPtHpTb4cnj4DLC6fLWqsg",
  authDomain: "tujuane-bb6d6.firebaseapp.com",
  projectId: "tujuane-bb6d6",
  storageBucket: "tujuane-bb6d6.appspot.com",
  messagingSenderId: "804984628238",
  appId: "1:804984628238:web:267d26e428b8b1b267c85f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth();
const db = getFirestore();

export { db }