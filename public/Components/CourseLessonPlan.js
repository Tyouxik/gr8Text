import React from "react";
import styles from "../../styles/course.module.css";

export default function CourseLessonPlan({
  lessons,
  addLesson,
  deleteLesson,
  toggleActiveLesson,
  newLessonTitle,
  setNewLessonTitle,
}) {
  if (!lessons)
    return (
      <>
        <h1>No lessons</h1>
      </>
    );

  const lessonPlan = lessons.map((lesson) => {
    return (
      <div
        className={styles.lesson}
        onClick={() => toggleActiveLesson(lesson.id)}
      >
        <h3>{lesson.title}</h3>
        <button onClick={() => deleteLesson(lesson.id)}>-</button>
      </div>
    );
  });
  const handleChange = (e) => {
    const { value } = e.target;
    setNewLessonTitle(value);
  };

  return (
    <>
      <div className={styles.coursePlan}>
        <h2 className={styles.lesson}>Lesson plan</h2>
        {lessonPlan}
        <div className={styles.add_lesson}>
          <input
            type="text"
            value={newLessonTitle}
            onChange={handleChange}
            placeholder="Add a New lesson"
          />
          <button
            disabled={newLessonTitle === ""}
            className={styles.add_btn}
            onClick={addLesson}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
