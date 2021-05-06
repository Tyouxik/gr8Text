import React from "react";
import styles from "../../styles/courses.module.scss";
import Link from "next/link";
import CourseInfoTag from "./CourseInfoTag";

export default function CourseCard({ course, link }) {
  const courseInfo = [
    { icon: "../images/access_icon.svg", text: course.access },
    {
      icon: "../images/lesson_icon.svg",
      text: course.lessons
        ? `${course.lessons.length} x lessons`
        : "No lessons yet",
    },
    { icon: "../images/category_icon.svg", text: course.category },
  ];
  const courseInfoTag = courseInfo.map((info) => {
    return <CourseInfoTag img={info.icon} text={info.text} />;
  });

  return (
    <Link href={link}>
      <div className={styles.card}>
        <h2 className={styles.card_title}>{course.title}</h2>
        <div className={styles.card_info}>{courseInfoTag}</div>
      </div>
    </Link>
  );
}
