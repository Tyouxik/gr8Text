import React from "react";
import styles from "../../../styles/course.module.scss";
import CourseDescript from "../../../public/Components/CourseDescript";
import CourseLessonPlan from "../../../public/Components/CourseLessonPlan";
import LessonContent from "../../../public/Components/LessonContent";
import { CourseProvider } from "../../../utils/course-context";

export default function Course() {
  return (
    <CourseProvider>
      <main className={styles.gridContainer}>
        <CourseDescript />
        <CourseLessonPlan />
        <LessonContent />
      </main>
    </CourseProvider>
  );
}
