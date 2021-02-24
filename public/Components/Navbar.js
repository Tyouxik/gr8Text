import React from "react";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <>
      <div className={styles.gridContainer}>
        <div className={styles.Logo}>
          <h1>Gr8Courses</h1>
        </div>
        <div className={styles.Links}>
          <Link href="/courses">All Courses</Link>
        </div>
        <div className={styles.Login}>
          <Link href="/signup" className={styles.signupBtn}>
            Signup
          </Link>
          <Link href="/login" className={styles.loginBtn}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
