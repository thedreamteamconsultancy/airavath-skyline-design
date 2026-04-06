import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF6d2lWtfgFKN3bz_9EU3kzmnjQdc7LQc",
  authDomain: "airavath-48b0b.firebaseapp.com",
  projectId: "airavath-48b0b",
  storageBucket: "airavath-48b0b.firebasestorage.app",
  messagingSenderId: "493591658960",
  appId: "1:493591658960:web:9f8a839fc17150b32b39d5",
  measurementId: "G-VHW1KPS1VX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
