import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

const firebaseConfig = {
  apiKey: "AIzaSyCLVQ7gbC1kvalCmBLomrMipLaSQ7go22U",
  authDomain: "testproject-59dc0.firebaseapp.com",
  databaseURL: "https://testproject-59dc0-default-rtdb.firebaseio.com",
  projectId: "testproject-59dc0",
  storageBucket: "testproject-59dc0.appspot.com",
  messagingSenderId: "281674466651",
  appId: "1:281674466651:web:3a5b4e81693f7a6176067e",
  measurementId: "G-BS8TQY5B63"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export default firebaseApp;