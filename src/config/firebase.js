// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDZ7_xQ25PYy5ciJ2MY6AtEinEgZ7Qufp4",
    authDomain: "chomat-shmuel.firebaseapp.com",
    projectId: "chomat-shmuel",
    storageBucket: "chomat-shmuel.appspot.com",
    messagingSenderId: "68509522833",
    appId: "1:68509522833:web:648c26dc8f3cdaf5989830",
    measurementId: "G-P9TDCB5FSR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
