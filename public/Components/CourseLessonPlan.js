import React from "react";
import styles from "../../styles/course.module.scss";

export default function CourseLessonPlan({
  lessons,
  activeLesson,
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
    let style;
    if (activeLesson && lesson.id === activeLesson.id) {
      style = `${styles.lesson} ${styles.activeLesson}`;
    } else {
      style = `${styles.lesson}`;
    }
    return (
      <div className={style} onClick={() => toggleActiveLesson(lesson.id)}>
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
        <h2 className={styles.lessonTitle}>Lesson plan</h2>
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
