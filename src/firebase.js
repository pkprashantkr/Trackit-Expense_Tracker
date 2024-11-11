// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuW7jcCDN0k6v7sZAjy1kiuCMJjHl92bc",
  authDomain: "trackit-expense-tracker-ff1f9.firebaseapp.com",
  projectId: "trackit-expense-tracker-ff1f9",
  storageBucket: "trackit-expense-tracker-ff1f9.appspot.com",
  messagingSenderId: "323411921469",
  appId: "1:323411921469:web:ba9bdea9bfd6f4fb82f854",
  measurementId: "G-10QVX6RWJ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
