import React from "react";
import Link from "next/link";
import styles from "../../styles/buttons.module.scss";

export default function LoginBtn() {
  return (
    <div className={styles.loginBtn}>
      <Link href="/login">Login</Link>
    </div>
  );
}
