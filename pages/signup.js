import React, { useEffect } from "react";
import styles from "../styles/Signup.module.scss";

export default function signup() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.signupContainer}>
        <div className={styles.emailWrapper}>
          <input type="text" name="email" id="email" placeholder="Email" />
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
          />
          <input
            type="text"
            name="repeatPassword"
            id="repeatPassword"
            placeholder="Repeat password"
          />
          <button>Sign up</button>
        </div>
        <p>OR</p>
        <div className={styles.socialWrapper}>
          <button>Google</button>
          <button>Github</button>
        </div>
      </div>
    </div>
  );
}
