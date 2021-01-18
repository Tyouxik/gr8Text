import React from "react";
import styles from "../../styles/course.module.css";

export default function CourseDescript(props) {
  if (!props.course) return <></>;
  const { title, access, category, students } = props.course;

  return (
    <>
      <div className={styles.courseDescript}>
        <h1>{title}</h1>
        <p>{access}</p>
        <p>{category}</p>
        <p>
          Current students:{" "}
          {students === undefined ? "no students yet" : students.join(", ")}
        </p>
      </div>
    </>
  );
}
