import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACyEWCwS3GvAec90kqeP6IOcPedGdFFO0",
  authDomain: "sabaudiarankings.firebaseapp.com",
  databaseURL:
    "https://sabaudiarankings-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sabaudiarankings",
  storageBucket: "sabaudiarankings.appspot.com",
  messagingSenderId: "475152816303",
  appId: "1:475152816303:web:c1580652bc26035fa19c5a",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
