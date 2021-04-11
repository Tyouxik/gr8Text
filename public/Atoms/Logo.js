import React from "react";
import Link from "next/link";
import styles from "../../styles/logo.module.scss";

export default function Logo() {
  return (
    <div className="logo">
      <Link href="/">
        <p className={styles.name}>
          <span className={styles.firstWord}>Course</span>
          <span className={styles.secondWord}>BUILDER</span>
        </p>
      </Link>
    </div>
  );
}
