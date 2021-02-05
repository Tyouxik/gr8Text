import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/courses.module.css";
import Link from "next/link";

export default function courses() {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");

  useEffect(async () => {
    const snapshot = await axios.get("/api/courses");
    const courses = snapshot.data;
    setCourses(courses);
  }, []);

  const coursesDisplay = courses ? (
    courses.map((course) => {
      return (
        <Link href={`/course/${course.id}`} key={course.id}>
          <div className={styles.card} key={course.id}>
            <img
              className={styles.card_img}
              src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            />
            <h4 className={styles.card_title}>{course.title}</h4>
            <p className={styles.card_info}>{course.access}</p>
          </div>
        </Link>
      );
    })
  ) : (
    <></>
  );

  const addCourse = async (e) => {
    e.preventDefault();
    const newCourseRef = await axios.post("/api/courses", { newCourseTitle });
    const newCourse = newCourseRef.data;
    console.log({ newCourse });
    setCourses([newCourse, ...courses]);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNewCourseTitle(value);
  };

  console.log(courses);
  return (
    <div>
      {coursesDisplay}
      <div className={styles.card}>
        <input type="text" value={newCourseTitle} onChange={handleChange} />
        <button onClick={addCourse}>Add a course</button>
      </div>
    </div>
  );
}
