import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAogmIEQXyYC3ZvOhI2T9fVYK5jHxTumNw",
  authDomain: "cinemay-5254e.firebaseapp.com",
  projectId: "cinemay-5254e",
  storageBucket: "cinemay-5254e.firebasestorage.app",
  messagingSenderId: "819036836055",
  appId: "1:819036836055:web:2defb962960082be6e2092"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };