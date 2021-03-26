import React from "react";
import styles from "../../styles/course.module.css";
import ToggleSwitch from "../Atoms/ToggleSwitch";
import { useState, useEffect } from "react";
import ContentEditor from "./ContentEditor";

export default function lessonContent({
  activeLesson,
  setActiveLesson,
  updateLesson,
  isEditable,
  setIsEditable,
}) {
  const [lessonContent, setLessonContent] = useState(activeLesson.content);
  const [debouncedLessonContent, setDebouncedLessonContent] = useState();

  useEffect(() => {
    setLessonContent(activeLesson.content);
  }, [activeLesson]);

  useEffect(() => {
    const timerId = setTimeout(
      () => setDebouncedLessonContent(lessonContent),
      3000
    );
    return () => clearTimeout(timerId);
  }, [lessonContent]);

  useEffect(() => {
    updateLesson("content", lessonContent);
  }, [debouncedLessonContent]);

  if (!activeLesson) {
    return (
      <div className={styles.editor}>
        <p> Select a Lesson</p>
        <p>View the Lesson as a student would</p>
        <p>Switch to edit mode, to edit your Lesson</p>
        <p>See your notes and student note</p>
      </div>
    );
  } else {
    return (
      <div className={styles.editor}>
        <div>
          <ToggleSwitch
            toggleState={isEditable}
            toggleStateFunction={setIsEditable}
          />
          <ContentEditor
            readOnly={!isEditable}
            activeLesson={activeLesson}
            lessonContent={lessonContent}
            setLessonContent={setLessonContent}
          />
        </div>
      </div>
    );
  }
}
