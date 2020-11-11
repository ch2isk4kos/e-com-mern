import * as firebase from "firebase";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfFQcQUDC_rMQmpir0n1DSLHzIP3JkMVo",
  authDomain: "e-com-mern.firebaseapp.com",
  databaseURL: "https://e-com-mern.firebaseio.com",
  projectId: "e-com-mern",
  storageBucket: "e-com-mern.appspot.com",
  messagingSenderId: "474810848497",
  appId: "1:474810848497:web:5a664f6a66756d8e124550",
  measurementId: "G-9B30TN0TTV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Exports
export const auth = firebase.auth();
export const googleOAuth = new firebase.auth.GoogleAuthProvider();
