import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_projectId}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_projectId}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
};

let firebaseAuth;
let firestore;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebaseAuth = firebase.auth();
  firestore = firebase.firestore();
}

export { firebaseAuth, firestore };
export default firebase;
