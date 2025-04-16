// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKBpSuQWZbUu71EuAkt749L7OBxe6V_8w",
  authDomain: "sonet-english-lab.firebaseapp.com",
  projectId: "sonet-english-lab",
  storageBucket: "sonet-english-lab.firebasestorage.app",
  messagingSenderId: "714447812887",
  appId: "1:714447812887:web:df50f909901d92e0ea1f52",
  measurementId: "G-HC89S394Q9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
// export const auth = getAuth(app);