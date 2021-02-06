import React from "react";
import styles from "../../styles/courses.module.css";
import Link from "next/link";
import CourseInfoTag from "./CourseInfoTag";

export default function CourseCard({ course }) {
  const courseInfo = [
    { icon: "../images/access_icon.svg", text: course.access },
    {
      icon: "../images/lesson_icon.svg",
      text: course.childLessons
        ? `${course.childLessons.length} x lessons`
        : "No lessons yet",
    },
    { icon: "../images/category_icon.svg", text: course.category },
  ];
  const courseInfoTag = courseInfo.map((info) => {
    return <CourseInfoTag img={info.icon} text={info.text} />;
  });

  return (
    <Link href={`/course/${course.id}`}>
      <div className={styles.card}>
        <div className={styles.img_holder}>
          <img
            className={styles.img_holder_img}
            src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          />
          <span>Free</span>
        </div>
        <div className={styles.card_info}>
          <h3 className={styles.card_title}>{course.title}</h3>
          {courseInfoTag}
        </div>
      </div>
    </Link>
  );
}