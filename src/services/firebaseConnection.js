import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyCCzrspwVWYgdhsxP28tRAdAQT7MaJYQek",
    authDomain: "socialmedia-46aab.firebaseapp.com",
    projectId: "socialmedia-46aab",
    storageBucket: "socialmedia-46aab.appspot.com",
    messagingSenderId: "991949489148",
    appId: "1:991949489148:web:cf6e05229030adb4d12879",
    measurementId: "G-YM08L4QV4V"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }
  export default firebase;