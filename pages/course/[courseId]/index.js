import React from "react";
import styles from "../../../styles/course.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CourseDescript from "../../../public/Components/CourseDescript";
import CourseLessonPlan from "../../../public/Components/CourseLessonPlan";
import LessonContent from "../../../public/Components/LessonContent";
import axios from "axios";

export default function Course() {
  const router = useRouter();
  const { courseId } = router.query;

  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState();
  const [activeLesson, setActiveLesson] = useState();
  const [newLessonTitle, setNewLessonTitle] = useState("");

  useEffect(async () => {
    const snapshot = await axios.get(`/api/course/${courseId}`);
    const course = snapshot.data.course;
    const lessons = snapshot.data.lessons;
    setCourse(course);
    setLessons(lessons);
  }, []);

  const deleteCourse = async () => {
    console.log(courseId);
    await axios.delete(`/api/course/${courseId}`);
    router.push("/courses");
  };

  const addLesson = async () => {
    console.log("I want to add a lesson");
    const newLessonRef = await axios.post(`/api/course/${courseId}/addlesson`, {
      newLessonTitle,
    });
    const newLesson = newLessonRef.data;
    setLessons([...lessons, newLesson]);
    setNewLessonTitle("");
  };

  const deleteLesson = async (id) => {
    console.log("I WANT TO DELETE A LESSON", id);
    await axios.delete(`/api/course/${courseId}/lesson/${id}`);
    const newLessonList = lessons.filter((lesson) => lesson.id !== id);
    setLessons(newLessonList);
  };
  const toggleActiveLesson = (id) => {
    const lesson = lessons.filter((lesson) => lesson.id === id)[0];
    setActiveLesson(lesson);
  };

  if (!lessons || !course) {
    return <></>;
  }
  return (
    <main className={styles.gridContainer}>
      <CourseDescript course={course} onRemove={deleteCourse} />
      <CourseLessonPlan
        courseId={course.id}
        lessons={lessons}
        addLesson={addLesson}
        deleteLesson={deleteLesson}
        toggleActiveLesson={toggleActiveLesson}
        newLessonTitle={newLessonTitle}
        setNewLessonTitle={setNewLessonTitle}
      />
      <LessonContent lesson={activeLesson} />
      <div className={styles.comments}>
        <div>
          <h1>Paola</h1>
          <p>There is a typo on the first paragraph</p>
          <button>Resolve</button>
        </div>
      </div>
    </main>
  );
}
