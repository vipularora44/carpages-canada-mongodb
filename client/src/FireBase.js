

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYXfYB7cdCfZH4q0UWULSmVMKJ2rW7gDg",
  authDomain: "carpages-canada-mongodb.firebaseapp.com",
  projectId: "carpages-canada-mongodb",
  storageBucket: "carpages-canada-mongodb.appspot.com",
  messagingSenderId: "274916313736",
  appId: "1:274916313736:web:cfcc8edd7cdcc9a0312d3d",
  measurementId: "G-579X48FG43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export default app;