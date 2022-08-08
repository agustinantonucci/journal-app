// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUIWYaLMm1AJ7uoqQfCw2yyl_2iHt1Qmo",
  authDomain: "react-cursos-715df.firebaseapp.com",
  projectId: "react-cursos-715df",
  storageBucket: "react-cursos-715df.appspot.com",
  messagingSenderId: "87319108345",
  appId: "1:87319108345:web:c56d8f1c686807ee53e028",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//funcionalidades de autenticación
export const FirebaseAuth = getAuth(FirebaseApp);
//configuracion de la base de datos
export const FirebaseDB = getFirestore(FirebaseApp);
