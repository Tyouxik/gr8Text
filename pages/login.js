import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../utils/auth-context";
import ErrorMessage from "../public/Atoms/ErrorMessage";

export default function signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    signinWithEmailAndPassword,
    signInWithGoogle,
    auth,
    loading,
    errMessage,
  } = useAuth();

  useEffect(() => {
    if (auth) {
      router.push("/courses");
    }
  }, [auth, loading]);

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const signinWithEmail = () => {
    signinWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.signupContainer}>
          <ErrorMessage>{errMessage}</ErrorMessage>
          <div className={styles.emailWrapper}>
            <input
              type="text"
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
            <button onClick={signinWithEmail}>Login</button>
          </div>
          <p>OR</p>
          <div className={styles.socialWrapper}>
            <button onClick={signInWithGoogle}>Google</button>
            <button>Github</button>
          </div>
        </div>
      </div>
    </>
  );
}
