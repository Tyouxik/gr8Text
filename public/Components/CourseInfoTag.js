import React from "react";
import styles from "../../styles/courses.module.css";

export default function CourseInfoTag({ img, text }) {
  return (
    <div className={styles.card_access}>
      <img className={styles.card_access_img} src={img} />
      <p className={styles.card_access_text}>{text}</p>
    </div>
  );
}
