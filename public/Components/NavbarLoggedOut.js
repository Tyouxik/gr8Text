import React from "react";
import Link from "next/link";
import styles from "../../styles/navbarLoggedOut.module.css";
import Logo from "../Atoms/Logo";
import NavSearchBar from "../Atoms/NavSearchBar";
import NavLinks from "../Atoms/NavLinks";
import LoginBtn from "../Atoms/LoginBtn";
import SignupBtn from "../Atoms/SignupBtn";

export default function NavbarLoggedOut() {
  return (
    <>
      <div className={styles.gridContainer}>
        <Logo className={styles.logo} />
        <NavSearchBar className={styles.SearchBar} />
        <NavLinks className={styles.Links} />
        <LoginBtn className={styles.LoginBtn} />
        <SignupBtn className={styles.SignupBtn} />
      </div>
    </>
  );
}
