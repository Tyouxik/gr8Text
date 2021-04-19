import React from "react";
import styles from "../../styles/navbar.module.scss";
import Logo from "../Atoms/Logo";
import NavLinks from "../Atoms/NavLinks";
import SignOut from "../Atoms/SignOut";
import BurgerMenu from "../Atoms/BurgerMenu";
import { useAuth } from "../../utils/auth-context";

export default function NavbarLoggedIn() {
  const { signOut } = useAuth();
  const links = [
    { type: "link", label: "All Courses", path: "/courses" },
    { type: "link", label: "Dashboard", path: "/dashboard" },
    { type: "button", label: "Sign Out", action: signOut },
  ];

  return (
    <div className={styles.flexContainer}>
      <Logo className={styles.logo} />
      <BurgerMenu links={links} />
    </div>
  );
}
