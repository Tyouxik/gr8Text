import React, { useEffect } from "react";
import styles from "../../../styles/course.module.scss";
import CourseDescript from "../../../public/Components/CourseDescript";
import CourseLessonPlan from "../../../public/Components/CourseLessonPlan";
import LessonContent from "../../../public/Components/LessonContent";
import { CourseProvider } from "../../../utils/course-context";
import { useAuth } from "../../../utils/auth-context";
import { useRouter } from "next/router";

export default function Course() {
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(!auth, !loading, !auth && !loading);
    // If auth is null and we are no longer loading
    if (!auth && !loading) {
      // redirect to index
      router.push("/");
    }
  }, [auth, loading]);

  return (
    <CourseProvider>
      <main className={styles.gridContainer}>
        <CourseDescript />
        <CourseLessonPlan />
        <LessonContent />
      </main>
    </CourseProvider>
  );
}
