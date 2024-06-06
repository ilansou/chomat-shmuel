import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDZ7_xQ25PYy5ciJ2MY6AtEinEgZ7Qufp4",
    authDomain: "chomat-shmuel.firebaseapp.com",
    projectId: "chomat-shmuel",
    storageBucket: "chomat-shmuel.appspot.com",
    messagingSenderId: "68509522833",
    appId: "1:68509522833:web:648c26dc8f3cdaf5989830",
    measurementId: "G-P9TDCB5FSR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
