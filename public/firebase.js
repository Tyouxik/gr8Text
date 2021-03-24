import firebase from "firebase/app";
import "firebase/firestore";
/* import "firebase/auth"; */
/* import "firebase/analytics"; */

var firebaseConfig = {
  apiKey: process.env.FIREBASE_apiKey,
  authDomain: process.env.FIREBASE_authDomain,
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  appId: process.env.FIREBASE_appId,
  measurementId: process.env.FIREBASE_measurementId,
};

if (typeof window !== "undefined") {
  /* window.firebase = firebase; */
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  /* firebase.analytics(); */
}

/* export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithGoogle(provider); */

export { firebase, firestore };
