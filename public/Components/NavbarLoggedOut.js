import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar.module.scss";
import Logo from "../Atoms/Logo";
import NavLinks from "../Atoms/NavLinks";
import LoginBtn from "../Atoms/LoginBtn";
import SignupBtn from "../Atoms/SignupBtn";

export default function NavbarLoggedOut() {
  const links = [{ label: "Courses", path: "/courses" }];

  return (
    <div className={styles.flexContainer}>
      <Logo className={styles.logo} />
      <NavLinks links={links} className={styles.Links} />
      <div className={styles.buttons}>
        <LoginBtn className={styles.LoginBtn} />
        <SignupBtn className={styles.SignupBtn} />
      </div>
    </div>
  );
}
