// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database"; // Import getDatabase
import { getAuth } from "firebase/auth";

import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig1 = {
  apiKey: "AIzaSyDB_SN0ZeRoWBOGlmVAMVSCPEa4gt0Tj5c",
  authDomain: "image-be8ac.firebaseapp.com",
  projectId: "image-be8ac",
  storageBucket: "image-be8ac.appspot.com",
  messagingSenderId: "3185781048",
  appId: "1:3185781048:web:e6025a003c7df4881c39cd",
  measurementId: "G-9PRMDRPSBG"
};

const firebaseConfig = {
  apiKey: "AIzaSyDrbfGcY2nDQuRIr5UEcmF8LbTppDaReoA",
  authDomain: "online-code-conducting-form.firebaseapp.com",
  projectId: "online-code-conducting-form",
  storageBucket: "online-code-conducting-form.firebasestorage.app",
  messagingSenderId: "545508472062",
  appId: "1:545508472062:web:54cb97710df165272221af",
  measurementId: "G-CCCKME2H9V",
  databaseURL: "https://online-code-conducting-form-default-rtdb.firebaseio.com",  // ADD THIS LINE
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Initialize Realtime Database



// Import Firebase SDKs


// Initialize Firebase
const app1 = initializeApp(firebaseConfig1, "secondaryApp"); // Use a unique name for the second app
const db1 = getFirestore(app1);
const auth1 = getAuth(app1);
const storage1 = getStorage(app1);
export { database, ref, onValue, auth, app, app1, db1, auth1, storage1, collection, doc, getDoc, setDoc }; // ✅ Export Firestore methods with prefix
