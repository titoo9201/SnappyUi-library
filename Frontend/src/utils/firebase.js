
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "snappyui-13bb6.firebaseapp.com",
  projectId: "snappyui-13bb6",
  storageBucket: "snappyui-13bb6.firebasestorage.app",
  messagingSenderId: "256363170919",
  appId: "1:256363170919:web:9992b63b1bc888220258c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider}