import React from "react";
import styles from "../../styles/course.module.scss";
import ToggleSwitch from "../Atoms/ToggleSwitch";
import { useState, useEffect } from "react";
import ContentEditor from "./ContentEditor";
import { useCourse } from "../../utils/course-context";

export default function lessonContent() {
  const { activeLesson, updateLesson, isEditable, setIsEditable } = useCourse();

  if (!activeLesson) {
    return <></>;
  }

  const [lessonContent, setLessonContent] = useState(activeLesson.content);
  const [debouncedLessonContent, setDebouncedLessonContent] = useState();

  useEffect(() => {
    setLessonContent(activeLesson.content);
  }, [activeLesson]);

  useEffect(() => {
    const timerId = setTimeout(
      () => setDebouncedLessonContent(lessonContent),
      1000
    );
    return () => clearTimeout(timerId);
  }, [lessonContent]);

  useEffect(() => {
    updateLesson("content", lessonContent);
  }, [debouncedLessonContent]);

  if (!activeLesson) {
    return (
      <div className={styles.courseContent}>
        <p> Select a Lesson</p>
        <p>View the Lesson as a student would</p>
        <p>Switch to edit mode, to edit your Lesson</p>
        <p>See your notes and student note</p>
      </div>
    );
  } else {
    return (
      <div className={styles.courseContent}>
        <ToggleSwitch
          toggleState={isEditable}
          toggleStateFunction={setIsEditable}
        />
        <ContentEditor
          lessonContent={lessonContent}
          setLessonContent={setLessonContent}
        />
      </div>
    );
  }
}
