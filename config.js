import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDsj6XadY6tVUZ2KDFBhOdkhaloWLadbd4",
  authDomain: "barter-app-e0f4b.firebaseapp.com",
  projectId: "barter-app-e0f4b",
  storageBucket: "barter-app-e0f4b.appspot.com",
  messagingSenderId: "371458357917",
  appId: "1:371458357917:web:445802d74905a4a8ab7274"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
