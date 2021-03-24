import React from "react";
import styles from "../../styles/ToggleSwitch.module.css";

export default function ToggleSwitch({ toggleState, toggleStateFunction }) {
  const handleChange = (event) => {
    toggleStateFunction(event.target.checked);
  };
  return (
    <>
      <label className={styles.switch}>
        <input type="checkbox" checked={toggleState} onChange={handleChange} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </>
  );
}
