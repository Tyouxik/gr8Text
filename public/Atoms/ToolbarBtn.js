import React from "react";
import styles from "../../styles/EditorToolbar.module.css";

export default function ToolbarBtn({ type, label, onClick }) {
  return (
    <button className={styles.toolbarBtn} onClick={() => onClick(type)}>
      {label}
    </button>
  );
}
