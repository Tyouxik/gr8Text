import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId,
};

/* if (typeof window !== "undefined" && !firebase.apps.length) {
  // Initialize Firebase
  
} */
firebase.initializeApp(firebaseConfig);

firebase.analytics();

export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase;
export { firebase };
