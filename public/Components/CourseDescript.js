import React, { useState } from "react";
import styles from "../../styles/course.module.scss";
import styleBtn from "../../styles/buttons.module.scss";
import DeleteButton from "../Atoms/DeleteButton";
import Link from "next/link";
import { useCourse } from "../../utils/course-context";

export default function CourseDescript() {
  const [edit, setEdit] = useState(false);
  const { course } = useCourse();

  if (!course) return <></>;
  return (
    <>
      {edit && <CourseDescriptEdit setEdit={setEdit} />}
      {!edit && <CourseDescriptDisplay setEdit={setEdit} />}
    </>
  );
}

function CourseDescriptDisplay({ setEdit }) {
  const { course, deleteCourse } = useCourse();
  const { title, access, description } = course;

  return (
    <div className={styles.courseDescript}>
      <div className={styles.courseDescript_courseInfo}>
        <h1>{title}</h1>
        <h2>{access}</h2>
      </div>
      <div className={styles.courseDescript_description}>
        <h2>Description</h2>
        <p>{description ? description : "add a description"}</p>
      </div>
      <div className={styles.courseDescript_btns}>
        <button className={styleBtn.edit_btn} onClick={() => setEdit(true)}>
          Edit
        </button>
        <DeleteButton onRemove={deleteCourse} label="Delete" />
      </div>
    </div>
  );
}

function CourseDescriptEdit({ setEdit }) {
  const { course, updateCourse } = useCourse();
  const { title, access, description } = course;
  const [newTitle, setNewTitle] = useState(title);
  const [newAccess, setNewAccess] = useState(access);
  const [newDescription, setnewDescription] = useState(description);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    console.log();
    if (name === "title") {
      setNewTitle(value);
    } else if (name === "access") {
      setNewAccess(value);
    } else {
      setnewDescription(value);
    }
  };

  const onSave = () => {
    let dataToUpdate = {};
    if (title != newTitle) {
      dataToUpdate.title = newTitle;
    }
    if (access != newAccess) {
      dataToUpdate.access = newAccess;
    }
    if (description != newDescription) {
      dataToUpdate.description = newDescription;
    }
    updateCourse(dataToUpdate);
    setEdit(false);
  };

  const onCancel = () => {
    setEdit(false);
    setNewAccess(access);
    setNewTitle(title);
    setnewDescription(description);
  };

  return (
    <div className={styles.courseDescript}>
      <div className={styles.courseDescript_courseInfo}>
        <label htmlFor="title">
          <h1>
            Title
            <input
              onChange={onHandleChange}
              type="text"
              name="title"
              value={newTitle}
            />
          </h1>
        </label>
        <label htmlFor="access">
          <h2>
            Access
            <select
              name="access"
              id="access"
              value={newAccess}
              onChange={onHandleChange}
            >
              <option value="public">public</option>
              <option value="private">private</option>
            </select>
          </h2>
        </label>
      </div>
      <div className={styles.courseDescript_description}>
        <label htmlFor="description">
          <h2>Description</h2>
          <textarea
            name="description"
            id="description"
            cols="60"
            rows="5"
            value={newDescription}
            onChange={onHandleChange}
          ></textarea>
        </label>
      </div>
      <button className={styleBtn.edit_btn} onClick={onSave}>
        Save
      </button>
      <button className={styleBtn.edit_btn} onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
