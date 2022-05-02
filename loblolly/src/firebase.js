// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU5luIb8vOxSSaBnGXBd3JHwIYxK_KWTk",
  authDomain: "sluglink-e60af.firebaseapp.com",
  databaseURL: "https://sluglink-e60af-default-rtdb.firebaseio.com",
  projectId: "sluglink-e60af",
  storageBucket: "sluglink-e60af.appspot.com",
  messagingSenderId: "684173672427",
  appId: "1:684173672427:web:ff38a4085ba927e7dce3ae",
  measurementId: "G-MBS6H31NRB"
};


// Initialize Firebase

export const fbapp = initializeApp(firebaseConfig);
