import React from "react";
import styles from "../../styles/heroes.module.scss";

export default function HeroTriangleDown({ children }) {
  return (
    <div className={styles.heroTriangleDown}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,0 50,100 100,0" />
      </svg>
      {children}
    </div>
  );
}
