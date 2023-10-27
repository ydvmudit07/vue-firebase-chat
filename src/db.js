/* eslint-disable no-unused-vars */
import "firebase/database"
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from 'firebase/firestore'

// import { addDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmsY2VVwgPtS5WgDa01U9xaJNWmA-AzEA",
  authDomain: "vue-firebase-chat-dc3a4.firebaseapp.com",
  projectId: "vue-firebase-chat-dc3a4",
  storageBucket: "vue-firebase-chat-dc3a4.appspot.com",
  messagingSenderId: "895517476679",
  appId: "1:895517476679:web:63ad88bc3ee855ceae2e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;