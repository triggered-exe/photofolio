
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDWmeqZi4dK2MzLJxzTxH8FJ9f3eRUBeIo",
    authDomain: "photofolio-f65f9.firebaseapp.com",
    projectId: "photofolio-f65f9",
    storageBucket: "photofolio-f65f9.appspot.com",
    messagingSenderId: "411151083886",
    appId: "1:411151083886:web:4bf18cc9f28a066414f97f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 