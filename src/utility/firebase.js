import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH9dXeShz4g-pXbg4ZP0-Ch-2-vl40XVA",
  authDomain: "clone-574ff.firebaseapp.com",
  projectId: "clone-574ff",
  storageBucket: "clone-574ff.firebasestorage.app",
  messagingSenderId: "763336701904",
  appId: "1:763336701904:web:e04d037bb638722e726bd5",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();
