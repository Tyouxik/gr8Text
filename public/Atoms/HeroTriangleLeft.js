import React from "react";
import styles from "../../styles/heroes.module.scss";

export default function HeroTriangleLeft({ children }) {
  return (
    <div className={styles.heroTriangleLeft}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 0,100 100,0" />
      </svg>
      {children}
    </div>
  );
}
