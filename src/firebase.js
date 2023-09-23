import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1af8jFWUAsdRnmA0cbI5cm4Twarpjcy4",
  authDomain: "galauthentication.firebaseapp.com",
  projectId: "galauthentication",
  storageBucket: "galauthentication.appspot.com",
  messagingSenderId: "82649856578",
  appId: "1:82649856578:web:ef30c5bc5e568a1c600bdb",
  measurementId: "G-94SCQ8KFB5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth}
