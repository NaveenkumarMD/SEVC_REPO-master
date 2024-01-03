
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAxpI0uHFbkyX6Fk8AOkCPKNioKNmebFJM",
  authDomain: "sveccoimbatore.firebaseapp.com",
  projectId: "sveccoimbatore",
  storageBucket: "sveccoimbatore.appspot.com",
  messagingSenderId: "802494292235",
  appId: "1:802494292235:web:cf885e5f88a944229a020e",
  measurementId: "G-LZ8JNWF3DV"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);
const db=getFirestore(firebaseapp)
//storage
const storage = getStorage(firebaseapp);
export default firebaseapp
export {db,storage}