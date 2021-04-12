import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/courses.module.scss";

export default function AddCourse({
  courses,
  setCourses,
  toggleAddCourse,
  setShowAddCourse,
}) {
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("Online Training");
  const [newCoursePrice, setNewCoursePrice] = useState("Free");
  const [currentUser, setCurrentUser] = useState("Anonymous");

  const addCourse = async (e) => {
    e.preventDefault();
    const newCourseRef = await axios.post("/api/courses", {
      newCourseTitle,
      newCourseCategory,
      newCoursePrice,
      currentUser,
    });
    const newCourse = newCourseRef.data;
    setCourses([newCourse, ...courses]);
    setShowAddCourse(false);
    setNewCourseTitle("");
    setNewCourseCategory("Online Training");
    setNewCoursePrice("Free");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      setNewCourseTitle(value);
    }
    if (name === "category") {
      setNewCourseCategory(value);
    }
    if (name === "price") {
      setNewCoursePrice(value);
    }
  };

  return (
    <>
      <div
        className={styles.add_course_blurred_background}
        onClick={toggleAddCourse}
      ></div>
      <div className={`${styles.add_course}`}>
        <input
          type="text"
          name="title"
          value={newCourseTitle}
          onChange={handleChange}
          placeholder="Course Title"
        />
        <select name="category" id="category" onChange={handleChange}>
          <option value="Online Training">Online Training</option>
          <option value="Offline Training">Offline Training</option>
          <option value="Coaching">Coaching</option>
          <option value="Consultation">Consultation</option>
        </select>

        <select name="price" id="price" onChange={handleChange}>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
        <button className={styles.add_course_btn} onClick={addCourse}>
          Add a course
        </button>
      </div>
    </>
  );
}
