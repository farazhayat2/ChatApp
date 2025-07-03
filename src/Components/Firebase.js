// src/Components/Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqcto4Rkv4vCGrmTR9sgWqnNj9KK3PQBQ",
  authDomain: "chat-c2222.firebaseapp.com",
  projectId: "chat-c2222",
  storageBucket: "chat-c2222.appspot.com", // fixed typo from .app to .com
  messagingSenderId: "615580656667", // fixed senderId
  appId: "1:615580656667:web:6836a842df716a513c84be"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Ensure login persists across reloads and redirects
setPersistence(auth, browserLocalPersistence);

export { db, auth, provider };
