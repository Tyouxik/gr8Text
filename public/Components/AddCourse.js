import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/courses.module.scss";
import { useAuth } from "../../utils/auth-context";

export default function AddCourse({ courses, setCourses, toggleAddCourse }) {
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("Tutorial");
  const [showForm, setShowForm] = useState(false);
  const { auth } = useAuth();
  const formRef = useRef();

  useEffect(() => {
    function handler(event) {
      if (!formRef.current?.contains(event.target)) {
        setShowForm(false);
      }
    }
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const addCourse = async (e) => {
    e.preventDefault();
    const newCourseRef = await axios.post("/api/course", {
      newCourseTitle,
      newCourseCategory,
      token: auth.token,
    });
    const newCourse = newCourseRef.data;
    setCourses([newCourse, ...courses]);
    setShowForm(false);
    setNewCourseTitle("");
    setNewCourseCategory("Tutorial");
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "title") {
      setNewCourseTitle(value);
    }
    if (name === "category") {
      setNewCourseCategory(value);
    }
  };

  return (
    <>
      <div className={`${styles.add_course}`} ref={formRef}>
        <h3 onClick={() => setShowForm(true)}>Add a course</h3>
        {showForm && (
          <form className={styles.add_course_form}>
            <input
              type="text"
              name="title"
              value={newCourseTitle}
              onChange={handleChange}
              placeholder="Course Title"
            />
            <select name="category" id="category" onChange={handleChange}>
              <option value="Tutorial">Tutorial</option>
              <option value="Article">Article</option>
            </select>
            <button className={styles.add_course_btn} onClick={addCourse}>
              Add a course
            </button>
          </form>
        )}
      </div>
    </>
  );
}
