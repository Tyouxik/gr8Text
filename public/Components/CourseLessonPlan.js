import React from "react";
import styles from "../../styles/course.module.css";
import Link from "next/link";

export default function CourseLessonPlan(props) {
  if (!props.course)
    return (
      <>
        <h1>No lessons</h1>
      </>
    );
  const { id, childLessons } = props.course;

  const lessonPlan = childLessons.map((lesson) => {
    return (
      <>
        <Link href={`/course/${id}/${lesson.id}`}>
          <a className={styles.lesson}>{lesson.title}</a>
        </Link>
      </>
    );
  });

  return (
    <>
      <div className={styles.coursePlan}>
        <p className={styles.lesson}>Lesson plan</p>
        {lessonPlan}
        <p className={styles.lesson}> + Add a lesson</p>
      </div>
    </>
  );
}
