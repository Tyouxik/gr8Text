import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar.module.scss";

export default function NavLinks({ links }) {
  const displayedLinks = links.map((link) => {
    return (
      <div className={styles.navLink}>
        <Link href={link.path}>{link.label}</Link>
      </div>
    );
  });

  return <div className={styles.navLink}>{displayedLinks}</div>;
}
