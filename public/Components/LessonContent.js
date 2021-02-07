import React from "react";
import styles from "../../styles/course.module.css";

import ToggleSwitch from "../../public/ToggleSwitch";
import { useState } from "react";
import ContentEditor from "../ContentEditor";
import ContentViewer from "../ContentViewer";

export default function LessonContent({ lesson }) {
  const [isEditable, setIsEditable] = useState(false);
  if (!lesson || !lesson.content) {
    return (
      <div className={styles.editor}>
        <p> Select a lesson</p>
        <p>View the lesson as a student would</p>
        <p>Switch to edit mode, to edit your lesson</p>
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
        </div>
        {isEditable && lesson.content && <ContentEditor lesson={lesson} />}
        {!isEditable && lesson.content && <ContentViewer lesson={lesson} />}
      </div>
    );
  }
}
