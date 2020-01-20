import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC031Zo3446lFsnBbStGpz_Zooczuf9wQw",
  authDomain: "chatapp-d2a95.firebaseapp.com",
  databaseURL: "https://chatapp-d2a95.firebaseio.com",
  projectId: "chatapp-d2a95",
  storageBucket: "chatapp-d2a95.appspot.com",
  messagingSenderId: "933238076577",
  appId: "1:933238076577:web:471ffd445b2b332dd42ce0",
  measurementId: "G-TSEYP1V437"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export { firebase };
