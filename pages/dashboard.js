import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/courses.module.scss";
import CourseCard from "../public/Components/CourseCard";
import AddCourse from "../public/Components/AddCourse";
import Navbar from "../public/Components/Navbar";
import { useAuth } from "../utils/auth-context";
import { fetcher } from "../utils/utilities";
import { useRouter } from "next/router";
import Link from "next/link";

export default function dashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState([{}]);
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
        return (
          <CourseCard course={course} link={`/course/${course.id}/editor`} />
        );
      })
    ) : (
      <></>
    );

  const toggleAddCourse = () => {
    setShowAddCourse(!showAddCourse);
  };

  return (
    <>
      <AddCourse
        toggleAddCourse={toggleAddCourse}
        courses={courses}
        setCourses={setCourses}
      />
      <div className={styles.course_cards}>{coursesDisplay}</div>
    </>
  );
}
