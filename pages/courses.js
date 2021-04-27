import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../public/Components/CourseCard";
import _ from "../styles/courses.module.scss";

export default function courses() {
  const [courses, setCourses] = useState([{}]);

  useEffect(async () => {
    const courses = await axios.get(`/api/courses`);
    setCourses(courses.data);
  }, []);

  return (
    <div className={_.coursesWrapper}>
      {courses.map((course) => (
        <CourseCard
          className={_.course}
          course={course}
          link={`/course/${course.id}`}
        />
      ))}
    </div>
  );
}
