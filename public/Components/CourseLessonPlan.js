import React, { useState, useEffect } from "react";
import styles from "../../styles/course.module.scss";
import { useCourse } from "../../utils/course-context";
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiFillEdit,
  AiOutlineCheckCircle,
} from "react-icons/ai";

export default function CourseLessonPlan() {
  const {
    lessons,
    activeLesson,
    deleteLesson,
    updateLesson,
    toggleActiveLesson,
  } = useCourse();
  const [showContent, setShowContent] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (window.innerWidth >= 800) {
      setShowContent(true);
    }
  }, []);

  useEffect(() => {
    if (activeLesson) {
      setNewTitle(activeLesson.title);
    }
  }, [activeLesson]);

  if (!lessons) return <></>;

  const lessonPlan = () => {
    const lessonList = lessons.map((lesson) => {
      let style;
      if (activeLesson && lesson.id === activeLesson.id) {
        style = `${styles.lesson} ${styles.activeLesson}`;
      } else {
        style = `${styles.lesson}`;
      }
      if (showInput && activeLesson.id === lesson.id) {
        return (
          <li className={style} onClick={() => toggleActiveLesson(lesson.id)}>
            <input
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            <AiOutlineCheckCircle
              onClick={() => {
                updateLesson("title", newTitle);
                setShowInput(false);
              }}
            />
            <AiOutlineMinusCircle onClick={() => deleteLesson(lesson.id)} />
          </li>
        );
      } else {
        return (
          <li className={style} onClick={() => toggleActiveLesson(lesson.id)}>
            <h3>{lesson.title}</h3>
            <AiFillEdit
              onClick={() => {
                setShowInput(true);
              }}
            />
            <AiOutlineMinusCircle onClick={() => deleteLesson(lesson.id)} />
          </li>
        );
      }
    });

    return (
      <ul>
        {lessonList}
        <AddLesson />
      </ul>
    );
  };

  const toggleContent = () => {
    console.log("I am triggered", showContent);
    setShowContent(!showContent);
  };

  return (
    <>
      {console.log(activeLesson)}
      <div className={styles.coursePlan}>
        <button className={styles.lessonTitle} onClick={toggleContent}>
          <h2>Lesson plan</h2>
        </button>
        {showContent && <div className={styles.lessonList}>{lessonPlan()}</div>}
      </div>
    </>
  );
}

function AddLesson() {
  const { newLessonTitle, setNewLessonTitle, addLesson } = useCourse();

  const handleChange = (e) => {
    const { value } = e.target;
    setNewLessonTitle(value);
  };

  return (
    <li className={styles.add_lesson}>
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
        <AiOutlinePlusCircle />
      </button>
    </li>
  );
}
