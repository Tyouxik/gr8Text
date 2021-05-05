import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar.module.scss";
import Logo from "../Atoms/Logo";
import NavLinks from "../Atoms/NavLinks";
import LoginBtn from "../Atoms/LoginBtn";
import SignupBtn from "../Atoms/SignupBtn";
import BurgerMenu from "../Atoms/BurgerMenu";

export default function NavbarLoggedOut() {
  const links = [
    { type: "link", label: "Courses", path: "/courses" },
    { type: "link", label: "Login", path: "/login" },
    { type: "link", label: "Signup", path: "/signup" },
  ];

  return (
    <div className={styles.flexContainer}>
      <Logo className={styles.logo} />
      <BurgerMenu links={links} />
    </div>
  );
}
