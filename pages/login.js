import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../utils/auth-context";
import ErrorMessage from "../public/Atoms/ErrorMessage";

export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    signinWithEmailAndPassword,
    signInWithGoogle,
    auth,
    loading,
    errMessage,
    setErrMessage,
  } = useAuth();

  useEffect(() => {
    if (auth) {
      router.push("/courses");
    }
  }, [auth, loading]);

  useEffect(() => {
    return () => {
      setErrMessage("");
    };
  }, []);

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const signinWithEmail = async () => {
    const response = await signinWithEmailAndPassword(email, password);
    console.log(response);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.signupContainer}>
          <div className={styles.socialWrapper}>
            <button onClick={signInWithGoogle}>Google</button>
          </div>
          <p>OR</p>

          <div className={styles.emailWrapper}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={onChange}
            />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              onChange={onChange}
            />
            <ErrorMessage>{errMessage}</ErrorMessage>
            <button onClick={signinWithEmail}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
