import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/courses.module.scss";
import CourseCard from "../public/Components/CourseCard";
import AddCourse from "../public/Components/AddCourse";
import Navbar from "../public/Components/Navbar";
import { useAuth } from "../utils/auth-context";
import { fetcher } from "../utils/utilities";
import { useRouter } from "next/router";

export default function dashboard() {
  const router = useRouter();

  const [courses, setCourses] = useState([{}]);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const { auth, loading } = useAuth();

  useEffect(() => {
    // If auth is null and we are no longer loading
    if (!auth && !loading) {
      // redirect to index
      router.push("/signup");
    }
  }, [auth, loading]);

  useEffect(async () => {
    if (auth) {
      const courses = await fetcher(`/api/course`, auth.token);
      console.log(courses);
      setCourses(courses);
    }
  }, [auth]);

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
        <div
          onClick={toggleAddCourse}
          className={`${styles.card} ${styles.add_course_btn}`}
        >
          <p>New Course</p>
        </div>
        {coursesDisplay}
      </div>
    </>
  );
}
