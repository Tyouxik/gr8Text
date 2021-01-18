import React from "react";
import styles from "../../styles/course.module.css";
import ToggleSwitch from "../../public/ToggleSwitch";
import { useState } from "react";
import ContentEditor from "../ContentEditor";
import ContentViewer from "../ContentViewer";

export default function LessonContent(props) {
  if (!props.lesson)
    return (
      <>
        <h1>No Content</h1>
      </>
    );
  const [isEditable, setIsEditable] = useState(false);
  const { lesson } = props;

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
