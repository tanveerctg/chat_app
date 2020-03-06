import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDcmjWSkyA8WLF8F1gomCVTnObyJiCURPc",
  authDomain: "chat-app-6d1b0.firebaseapp.com",
  databaseURL: "https://chat-app-6d1b0.firebaseio.com",
  projectId: "chat-app-6d1b0",
  storageBucket: "chat-app-6d1b0.appspot.com",
  messagingSenderId: "656892870129",
  appId: "1:656892870129:web:6cc780a4165e64080a9850",
  measurementId: "G-XS88SF2D7M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export { firebase };
