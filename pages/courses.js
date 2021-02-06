import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/courses.module.css";

import CourseCard from "../public/Components/CourseCard";

export default function courses() {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("Online Training");
  const [showAddCourse, setShowAddCourse] = useState(false);

  useEffect(async () => {
    const snapshot = await axios.get("/api/courses");
    const courses = snapshot.data;
    setCourses(courses);
  }, []);

  const coursesDisplay = courses ? (
    courses.map((course) => {
      return <CourseCard course={course} key={course.id} />;
    })
  ) : (
    <></>
  );

  const addCourse = async (e) => {
    e.preventDefault();
    const newCourseRef = await axios.post("/api/courses", {
      newCourseTitle,
      newCourseCategory,
    });
    const newCourse = newCourseRef.data;
    setCourses([newCourse, ...courses]);
    setShowAddCourse(false);
    setNewCourseTitle("");
    setNewCourseCategory("Online Training");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      setNewCourseTitle(value);
    }
    if (name === "category") {
      setNewCourseCategory(value);
    }
  };
  const toggleNewCourse = () => {
    setShowAddCourse(!showAddCourse);
  };

  console.log(courses);
  return (
    <>
      {!showAddCourse && (
        <div onClick={toggleNewCourse} className={styles.add_course_btn}>
          New Course
        </div>
      )}
      {showAddCourse && (
        <>
          <div
            className={styles.add_course_blurred_background}
            onClick={toggleNewCourse}
          ></div>
          <div className={`${styles.add_course}`}>
            <input
              type="text"
              name="title"
              value={newCourseTitle}
              onChange={handleChange}
              placeholder="Course Title"
            />
            <select name="category" id="category" onChange={handleChange}>
              <option value="Online Training">Online Training</option>
              <option value="Offline Training">Offline Training</option>
              <option value="Coaching">Coaching</option>
              <option value="Consultation">Consultation</option>
            </select>
            <button className={styles.add_course_btn} onClick={addCourse}>
              Add a course
            </button>
          </div>
        </>
      )}

      <div className={styles.course_cards}>{coursesDisplay}</div>
    </>
  );
}
