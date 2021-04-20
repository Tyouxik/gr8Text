import React from "react";
import styles from "../../styles/toggleSwitch.module.scss";

export default function ToggleSwitch({ toggleState, toggleStateFunction }) {
  const handleChange = (event) => {
    toggleStateFunction(event.target.checked);
  };
  return (
    <div className={styles.switch_wrapper}>
      <label className={styles.switch}>
        <input type="checkbox" checked={toggleState} onChange={handleChange} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}
