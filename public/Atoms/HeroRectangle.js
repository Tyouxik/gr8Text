import React from "react";
import styles from "../../styles/heroes.module.scss";

export default function HeroRectangle({ children }) {
  return <div className={styles.heroRectangle}>{children}</div>;
}
