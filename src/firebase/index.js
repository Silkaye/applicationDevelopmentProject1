import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJQB0iOxblH83ZN3sBdr8GCcgj4J1h5P0",
  authDomain: "applicationdevelopmentpr-f466b.firebaseapp.com",
  projectId: "applicationdevelopmentpr-f466b",
  storageBucket: "applicationdevelopmentpr-f466b.appspot.com",
  messagingSenderId: "519258752160",
  appId: "1:519258752160:web:ad2ba2e7fc95e4e8b575c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };

//export { auth };