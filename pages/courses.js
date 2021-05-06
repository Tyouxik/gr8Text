import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import CourseCard from "../public/Components/CourseCard";
import _ from "../styles/courses.module.scss";

export default function courses() {
  const [courses, setCourses] = useState([]);

  useEffect(async () => {
    const courses = await axios.get(`/api/courses`);
    setCourses(courses.data.courses);
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
