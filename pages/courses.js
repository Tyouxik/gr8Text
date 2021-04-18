import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../public/Components/Navbar";
import CourseCard from "../public/Components/CourseCard";

export default function courses() {
  const [courses, setCourses] = useState([{}]);
  const [showAddCourse, setShowAddCourse] = useState(false);

  useEffect(async () => {
    const courses = await axios.get(`/api/courses`);
    setCourses(courses.data);
  }, []);

  return (
    <div>
      {courses.map((course) => (
        <CourseCard course={course} />
      ))}
    </div>
  );
}
