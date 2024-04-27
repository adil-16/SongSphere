import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf8-Cz0r2zpDV6WGB3YDwiIGn6MC_4TCA",
  authDomain: "songssphere.firebaseapp.com",
  projectId: "songssphere",
  storageBucket: "songssphere.appspot.com",
  messagingSenderId: "360277516059",
  appId: "1:360277516059:web:b3ef9a53f224b8f3e4bdbe",
  measurementId: "G-M7ERZE799J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };