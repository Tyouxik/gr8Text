import React from "react";
import styles from "../../styles/navbar.module.scss";
import Logo from "../Atoms/Logo";
import NavLinks from "../Atoms/NavLinks";
import SignOut from "../Atoms/SignOut";

export default function NavbarLoggedIn() {
  const links = [
    { label: "All Courses", path: "/courses" },
    { label: "Dashboard", path: "/dashboard" },
  ];
  return (
    <div className={styles.flexContainer}>
      <Logo className={styles.logo} />
      <NavLinks links={links} className={styles.Links} />
      <div className={styles.buttons}>
        <SignOut />
      </div>
    </div>
  );
}
