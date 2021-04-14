import React, { useState, useContext, useEffect } from "react";

import firebase, { firebaseAuth } from "./firebase";

const authContext = React.createContext({
  auth: null,
  loading: true,
  signupWithEmailAndPassword: () => {},
  signinWithEmailAndPassword: () => {},
  signInWithGoogle: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Helper to easily get auth context within components
export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");

  const clear = () => {
    setAuth(null);
    setLoading(true);
  };

  const collectUserData = (user) => {
    const {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      phoneNumber,
      photoURL,
      token,
    } = user;
    return {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      phoneNumber,
      photoURL,
      token,
    };
  };

  const authStateChanged = async (authState) => {
    if (authState) {
      const formattedAuth = collectUserData(authState);
      formattedAuth.token = await authState.getIdToken();
      // Stores auth into state.
      setAuth(formattedAuth);
      // Sets loading state to false.
      setLoading(false);
      // ...
    } else {
      clear();
    }
  };

  const signupWithEmailAndPassword = async (email, password) => {
    try {
      firebaseAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      setErrMessage(errorMessage);
    }
  };

  const signinWithEmailAndPassword = (email, password) => {
    try {
      setLoading(true);
      firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      setErrMessage(errorMessage);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    firebaseAuth.useDeviceLanguage();
    let provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider);
  };

  const signOut = async () => {
    try {
      firebaseAuth.signOut();
      clear();
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    auth,
    loading,
    errMessage,
    signupWithEmailAndPassword,
    signinWithEmailAndPassword,
    signInWithGoogle,
    signOut,
  };
}
