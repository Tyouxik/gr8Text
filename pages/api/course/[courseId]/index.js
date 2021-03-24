import db from "../../../../utils/db/index";
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
        const { title, price, category, access, id } = course;
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
  });

export default handler;
