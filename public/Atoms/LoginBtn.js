import React from "react";
import Link from "next/link";
import styles from "../../styles/loginBtn.module.css";

export default function LoginBtn() {
  return (
    <div className={styles.loginBtn}>
      <Link href="/login">Login</Link>
    </div>
  );
}
