import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDli8ehFr9vVeI2VnRGtZq2jQ-zT4rTK5U",
  authDomain: "penyusunankurikulum-7787c.firebaseapp.com",
  projectId: "penyusunankurikulum-7787c",
  storageBucket: "penyusunankurikulum-7787c.firebasestorage.app",
  messagingSenderId: "678560102638",
  appId: "1:678560102638:web:91615893a919d4f8125bff",
  measurementId: "G-8QX71NN8HW"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
