import React from "react";
import styles from "../../../styles/course.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import ToggleSwitch from "../../../public/ToggleSwitch";
import { useRouter } from "next/router";
import data from "../../../public/lessons.json";
import CourseDescript from "../../../public/Components/CourseDescript";
import CourseLessonPlan from "../../../public/Components/CourseLessonPlan";
import LessonContent from "../../../public/Components/LessonContent";

export default function Lesson() {
  const [currentCourse, setCurrentCourse] = useState();
  const [currentLesson, setCurrentLesson] = useState();
  const router = useRouter();
  const { courseId, lessonId } = router.query;

  useEffect(() => {
    const course = data.course.filter((el) => el.id === +courseId)[0];
    const lesson = course.lessons.filter((el) => el.id === +lessonId)[0];
    setCurrentCourse(course);
    setCurrentLesson(lesson);
  }, [courseId, lessonId]);

  return (
    <main className={styles.gridContainer}>
      <CourseDescript course={currentCourse} />
      <CourseLessonPlan course={currentCourse} />
      <LessonContent lesson={currentLesson} />
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
