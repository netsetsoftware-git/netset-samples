// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAtDsaCdyN64NZpJM5fKca-7jSPhl3cqI8",

  authDomain: "netset-sample.firebaseapp.com",

  projectId: "netset-sample",

  storageBucket: "netset-sample.firebasestorage.app",

  messagingSenderId: "910749394041",

  appId: "1:910749394041:web:a7e98394b9e21505ce60a8"
  
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
