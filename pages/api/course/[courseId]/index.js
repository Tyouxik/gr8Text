import { db, auth } from "../../../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../../../utils/utilities";

const handler = nc()
  .get(async (req, res) => {
    try {
      const { courseId } = req.query;

      const courseRef = db.collection("courses").doc(courseId);
      const lessonsRef = courseRef.collection("lessons");

      const courseInfo = await courseRef.get();
      const course = collectIdsAndData(courseInfo);

      const lessonsListRef = await lessonsRef.get();
      const lessons = lessonsListRef.docs.map(collectIdsAndData);

      if (!course) {
        res.json("No course");
      } else {
        res.json({ course, lessons });
      }
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { courseId } = req.query;
      await db.doc(`/courses/${courseId}`).delete();
      res.json("Your course has been successfully deleted");
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      const { courseId } = req.query;
      const { authToken, content } = req.body;

      const { uid } = await auth.verifyIdToken(authToken);
      console.log({ uid, content });

      const courseRef = await db.collection("courses").doc(courseId).get();
      console.log(courseRef.data().creator);
      if (courseRef.data().creator === uid) {
        await db.doc(`/courses/${courseId}`).update(content);
        let updatedCourse = await db.collection("courses").doc(courseId).get();
        updatedCourse = collectIdsAndData(updatedCourse);
        res.json(updatedCourse);
      } else {
        res.json({});
      }
    } catch (error) {
      console.log(error);
    }
  });
export default handler;
