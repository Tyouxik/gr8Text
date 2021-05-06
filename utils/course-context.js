import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth-context";
import axios from "axios";

const courseContext = React.createContext();

export function CourseProvider({ children }) {
  const course = useProvideCourse();
  return (
    <courseContext.Provider value={course}>{children}</courseContext.Provider>
  );
}

export const useCourse = () => useContext(courseContext);

function useProvideCourse() {
  const router = useRouter();
  const { courseId } = router.query;
  const { auth } = useAuth();
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
  }, [router, auth]);

  const addLesson = async () => {
    const newLessonRef = await axios.post(`/api/course/${courseId}/lessons`, {
      newLessonTitle,
      token: auth.token,
    });
    const newLesson = newLessonRef.data;
    setLessons([...lessons, newLesson]);
    setNewLessonTitle("");
  };

  const deleteLesson = async (id) => {
    await axios.post(`/api/course/${courseId}/lesson/${id}/deleteLesson`, {
      token: auth.token,
    });
    const newLessonList = lessons.filter((lesson) => lesson.id !== id);
    setLessons(newLessonList);
  };

  const updateLesson = async (key, content) => {
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
    await axios.post(`/api/course/${courseId}/deleteCourse`, {
      token: auth.token,
    });
    router.push("/dashboard");
  };

  const updateCourse = async (content) => {
    const courseRef = await axios.post(`/api/course/${courseId}`, {
      content,
      authToken: auth.token,
    });
    setCourse(courseRef.data);
  };

  const toggleActiveLesson = (id) => {
    const lesson = lessons.filter((lesson) => lesson.id === id)[0];
    setActiveLesson(lesson);
  };

  return {
    course,
    setCourse,
    lessons,
    setLessons,
    activeLesson,
    setActiveLesson,
    newLessonTitle,
    setNewLessonTitle,
    addLesson,
    deleteLesson,
    updateLesson,
    deleteCourse,
    updateCourse,
    toggleActiveLesson,
  };
}
