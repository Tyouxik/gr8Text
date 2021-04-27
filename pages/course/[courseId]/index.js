import React, { useState, useEffect } from "react";
import { useAuth } from "../../../utils/auth-context";
import { useRouter } from "next/router";
import axios from "axios";
import _ from "../../../styles/course_user.module.scss";
import ContentViewer from "../../../public/Components/ContentViewer";

export default function index() {
  const { auth, loading } = useAuth();
  const router = useRouter();
  const { courseId } = router.query;
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(async () => {
    const snapshot = await axios.get(`/api/course/${courseId}`);
    const course = snapshot.data.course;
    const lessons = snapshot.data.lessons;

    setCourse(course);
    setLessons(lessons);
  }, [router]);

  if (!course || !lessons) {
    return <></>;
  }

  const selectLesson = (id) => {
    const lesson = lessons.filter((lesson) => lesson.id === id)[0];
    console.log({ lesson });
    setSelectedLesson(lesson);
  };

  const lessonList = lessons.map((lesson) => {
    return <li onClick={() => selectLesson(lesson.id)}>{lesson.title}</li>;
  });

  return (
    <main className={_.wrapper}>
      <header>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </header>
      <section className={_.lessons}>
        <details>
          <summary>
            <h2>Lessons: {selectedLesson ? selectedLesson.title : ""}</h2>
          </summary>
          <ul>{lessonList}</ul>
        </details>
      </section>
      <section className={_.content}>
        {selectedLesson && <ContentViewer content={selectedLesson.content} />}
      </section>
    </main>
  );
}
