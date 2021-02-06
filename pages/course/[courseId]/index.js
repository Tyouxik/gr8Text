import React from "react";
import styles from "../../../styles/course.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import data from "../../../public/lessons.json";
import CourseDescript from "../../../public/Components/CourseDescript";
import CourseLessonPlan from "../../../public/Components/CourseLessonPlan";
import LessonEditor from "../../../public/Components/LessonContent";
import axios from "axios";

export default function Course() {
  const [currentCourse, setCurrentCourse] = useState();
  const router = useRouter();
  const { courseId } = router.query;

  useEffect(async () => {
    const snapshot = await axios.get(`/api/course/${courseId}`);
    const course = snapshot.data;
    console.log(course.childLessons);
    setCurrentCourse(course);
  }, []);

  const handleCourseDelete = async () => {
    console.log(courseId);
    await axios.delete(`/api/course/${courseId}`);
    router.push("/courses");
  };

  return (
    <main className={styles.gridContainer}>
      <CourseDescript course={currentCourse} onRemove={handleCourseDelete} />
      {/* <CourseLessonPlan course={currentCourse} /> */}
      <div className={styles.editor}>
        <p> Select a lesson</p>
        <p>View the lesson as a student would</p>
        <p>Switch to edit mode, to edit your lesson</p>
        <p>See your notes and student note</p>
      </div>
      <div className={styles.comments}>
        <div>
          <h1>Paola</h1>
          <p>There is a typo on the first paragraph</p>
          <button>Resolve</button>
        </div>
      </div>
    </main>
  );
}
