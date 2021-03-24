import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/courses.module.css";
import CourseCard from "../public/Components/CourseCard";
import AddCourse from "../public/Components/AddCourse";

export default function courses() {
  const [courses, setCourses] = useState([{}]);
  const [showAddCourse, setShowAddCourse] = useState(false);

  useEffect(async () => {
    const courses = await axios.get(`/api/courses`);
    setCourses(courses.data);
  }, []);

  const coursesDisplay =
    courses.length !== 0 ? (
      courses.map((course) => {
        return <CourseCard course={course} />;
      })
    ) : (
      <></>
    );

  const toggleAddCourse = () => {
    setShowAddCourse(!showAddCourse);
  };

  return (
    <>
      {showAddCourse && (
        <AddCourse
          toggleAddCourse={toggleAddCourse}
          courses={courses}
          setCourses={setCourses}
          setShowAddCourse={setShowAddCourse}
        />
      )}

      <div className={styles.course_cards}>
        <div onClick={toggleAddCourse} className={styles.add_course_btn}>
          New Course
        </div>
        {coursesDisplay}
      </div>
    </>
  );
}
