import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Signup.module.scss";
import { useAuth } from "../utils/auth-context";
import ErrorMessage from "../public/Atoms/ErrorMessage";

export default function signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const {
    signupWithEmailAndPassword,
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

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setRepeatPassword(e.target.value);
    }
  };

  const signupWithEmail = () => {
    if (password !== repeatPassword) {
      setErrMessage("Enter same password");
      setPassword("");
      setRepeatPassword("");
    } else {
      signupWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    }
  };

  return (
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
            value={email}
            placeholder="Email"
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={onChange}
          />
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            value={repeatPassword}
            placeholder="Repeat password"
            onChange={onChange}
          />
          <ErrorMessage>{errMessage}</ErrorMessage>
          <button onClick={signupWithEmail}>Sign up</button>
        </div>
      </div>
    </div>
  );
}
