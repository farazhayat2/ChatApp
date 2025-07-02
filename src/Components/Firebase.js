import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Corrected config (removed incorrect values in storageBucket & messagingSenderId)
const firebaseConfig = {
  apiKey: "AIzaSyCqcto4Rkv4vCGrmTR9sgWqnNj9KK3PQBQ",
  authDomain: "chat-c2222.firebaseapp.com",
  projectId: "chat-c2222",
  storageBucket: "chat-c2222.appspot.com", // ✅ fixed
  messagingSenderId: "615580656667",        // ✅ fixed
  appId: "1:615580656667:web:6836a842df716a513c84be"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
