import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/courses.module.css";

export default function courses() {
  const [courses, setCourses] = useState([]);

  useEffect(async () => {
    const snapshot = await axios.get("/api/courses");
    const courses = snapshot.data.courses;
    setCourses(courses);
  }, []);

  const coursesDisplay = courses ? (
    courses.map((course) => {
      return (
        <div className={styles.card}>
          <img
            className={styles.card_img}
            src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          />
          <h4 className={styles.card_title}>{course.title}</h4>
          <p className={styles.card_info}>{course.access}</p>
        </div>
      );
    })
  ) : (
    <></>
  );

  return <div>{coursesDisplay}</div>;
}
