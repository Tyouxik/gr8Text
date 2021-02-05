import React from "react";
import styles from "../../styles/courses.module.css";
import Link from "next/link";

export default function courseCard({ course }) {
  return (
    <Link href={`/course/${course.id}`}>
      <div className={styles.card}>
        <img
          className={styles.card_img}
          src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        />
        <div className={styles.card_info}>
          <hr />
          <h4 className={styles.card_title}>{course.title}</h4>
          <div className={styles.card_access}>
            <img
              className={styles.card_access_img}
              src="../images/access_icon.svg"
            />
            <p>{course.access}</p>
          </div>
          <p>{course.access}</p>
        </div>
      </div>
    </Link>
  );
}
