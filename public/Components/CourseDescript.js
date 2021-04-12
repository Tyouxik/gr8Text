import React from "react";
import styles from "../../styles/course.module.scss";
import DeleteButton from "../Atoms/DeleteButton";
import Link from "next/link";

export default function CourseDescript({ course, onRemove }) {
  if (!course) return <></>;
  const { title, access, category, students, description } = course;

  return (
    <>
      <div className={styles.courseDescript}>
        <div className={styles.courseDescript_courseInfo}>
          <h1>{title}</h1>
          <p>{access}</p>
          <p>{category}</p>
          <p>
            Current students:{" "}
            {students === undefined ? "no students yet" : students.join(", ")}
          </p>
          <DeleteButton onRemove={onRemove} label="Delete course" />
        </div>
        <div className={styles.courseDescript_description}>
          <h2>Description</h2>
          {description ? description : "add a description"}
        </div>
        <div className={styles.courseDescript_image}>
          <img
            className={styles.courseImg}
            width="90%"
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
