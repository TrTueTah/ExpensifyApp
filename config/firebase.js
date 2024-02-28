// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
import { collection } from 'firebase/firestore' 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrOV8qEUoAp1Ns4Og_2HBHLwNX48v7QOs",
  authDomain: "expensify-76815.firebaseapp.com",
  projectId: "expensify-76815",
  storageBucket: "expensify-76815.appspot.com",
  messagingSenderId: "146561326855",
  appId: "1:146561326855:web:b972bc86ab76fd6f82efa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app;