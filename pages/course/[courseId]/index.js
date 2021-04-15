import React from "react";
import styles from "../../../styles/course.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CourseDescript from "../../../public/Components/CourseDescript";
import CourseLessonPlan from "../../../public/Components/CourseLessonPlan";
import LessonContent from "../../../public/Components/LessonContent";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../../../utils/auth-context";

export default function Course() {
  const router = useRouter();
  const { courseId } = router.query;
  const { auth } = useAuth();

  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState();
  const [activeLesson, setActiveLesson] = useState();
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(async () => {
    const snapshot = await axios.get(`/api/course/${courseId}`);
    const course = snapshot.data.course;
    const lessons = snapshot.data.lessons;

    console.log(snapshot);
    setCourse(course);
    setLessons(lessons);
  }, [router, auth]);

  const addLesson = async () => {
    const newLessonRef = await axios.post(`/api/course/${courseId}/lessons`, {
      newLessonTitle,
    });
    const newLesson = newLessonRef.data;
    setLessons([...lessons, newLesson]);
    setNewLessonTitle("");
  };

  const deleteLesson = async (id) => {
    await axios.delete(`/api/course/${courseId}/lesson/${id}`);
    const newLessonList = lessons.filter((lesson) => lesson.id !== id);
    setLessons(newLessonList);
  };

  const updateLesson = async (key, content) => {
    console.log(
      JSON.stringify(content) !== JSON.stringify(activeLesson.content)
    );
    if (
      key === "content" &&
      JSON.stringify(content) !== JSON.stringify(activeLesson.content)
    ) {
      const lessonRef = await axios.post(
        `/api/course/${courseId}/lesson/${activeLesson.id}`,
        { key, content }
      );
      setActiveLesson(lessonRef.data);
      const newLessons = lessons.map((lesson) => {
        console.log(lesson.id === lessonRef.data.id);
        if (lesson.id === lessonRef.data.id) {
          return lessonRef.data;
        }
        return lesson;
      });
      setLessons(newLessons);
    }
  };

  const deleteCourse = async () => {
    console.log(courseId);
    await axios.delete(`/api/course/${courseId}`);
    router.push("/dashboard");
  };

  const updateCourse = async (key, content) => {
    const courseRef = await axios.post(`/api/course/${courseId}`, {
      key,
      content,
    });
    setCourse(courseRef.data);
  };

  const toggleActiveLesson = (id) => {
    if (!isEditable) {
      const lesson = lessons.filter((lesson) => lesson.id === id)[0];
      setActiveLesson(lesson);
    }
  };

  if (!lessons || !course) {
    return <></>;
  }

  return (
    <>
      <div className={styles.backToCourse}>
        <Link href="/dashboard">Back to courses</Link>
      </div>
      <main className={styles.gridContainer}>
        <CourseDescript
          course={course}
          onRemove={deleteCourse}
          updateCourse={updateCourse}
        />
        <CourseLessonPlan
          courseId={course.id}
          activeLesson={activeLesson}
          lessons={lessons}
          addLesson={addLesson}
          deleteLesson={deleteLesson}
          toggleActiveLesson={toggleActiveLesson}
          newLessonTitle={newLessonTitle}
          setNewLessonTitle={setNewLessonTitle}
        />
        {activeLesson ? (
          <LessonContent
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            updateLesson={updateLesson}
            activeLesson={activeLesson}
            setActiveLesson={setActiveLesson}
          />
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
