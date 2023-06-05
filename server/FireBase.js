

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrRmwYJSpBHlZO0-eRmlIc6UerDpLv8ak",
  authDomain: "carpages-canada-3b271.firebaseapp.com",
  projectId: "carpages-canada-3b271",
  storageBucket: "carpages-canada-3b271.appspot.com",
  messagingSenderId: "542552587070",
  appId: "1:542552587070:web:7c32dc902ca18c397aca6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage =getStorage(app) 
export  {analytics,storage};
