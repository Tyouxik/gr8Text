import React from "react";
import Link from "next/link";
import styles from "../../styles/signupBtn.module.css";

export default function SignupBtn() {
  return (
    <div className={styles.signupBtn}>
      <Link href="/signup">Signup</Link>
    </div>
  );
}
