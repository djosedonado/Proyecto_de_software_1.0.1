import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB550jkawqRhuQUViXPZ01Weu-sLzB_nJ4",
  authDomain: "nutrisoft-89f7e.firebaseapp.com",
  projectId: "nutrisoft-89f7e",
  storageBucket: "nutrisoft-89f7e.appspot.com",
  messagingSenderId: "907547230193",
  appId: "1:907547230193:web:9643abdcc7b6b3bf46ce50",
  measurementId: "G-6QT3Z2MN4X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
