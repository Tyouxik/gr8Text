import React from "react";
import styles from "../../styles/buttons.module.scss";

export default function button({ label, onRemove }) {
  return (
    <button className={styles.delete_btn} onClick={onRemove}>
      {label}
    </button>
  );
}
