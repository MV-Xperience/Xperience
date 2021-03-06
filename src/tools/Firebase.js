// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDuzirc5m7jvLfQlcw1pOXsC0s0Fg2J8A",
  authDomain: "xperiance-e2fd7.firebaseapp.com",
  databaseURL: "https://xperiance-e2fd7-default-rtdb.firebaseio.com",
  projectId: "xperiance-e2fd7",
  storageBucket: "xperiance-e2fd7.appspot.com",
  messagingSenderId: "945190412173",
  appId: "1:945190412173:web:41990b52cd9e337756a7c4",
  measurementId: "G-RV1P34P93Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
export { analytics };