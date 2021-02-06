import React from "react";
import styles from "../../styles/course.module.css";
import DeleteButton from "../Atoms/DeleteButton";

export default function CourseDescript({ course, onRemove }) {
  if (!course) return <></>;
  const { title, access, category, students } = course;

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
        <DeleteButton onRemove={onRemove} label="Delete course" />
      </div>
    </>
  );
}
