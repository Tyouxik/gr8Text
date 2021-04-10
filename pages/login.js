import React, { useEffect } from "react";
import moduleName from "../public/Components/NavbarLoggedOut";
import styles from "../styles/Signup.module.scss";

export default function signup() {
  return (
    <>
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
            <button>Login</button>
          </div>
          <p>OR</p>
          <div className={styles.socialWrapper}>
            <button>Google</button>
            <button>Github</button>
          </div>
        </div>
      </div>
    </>
  );
}
