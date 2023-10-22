import firebase from "firebase/app"
import "firebase/database"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
export default app;