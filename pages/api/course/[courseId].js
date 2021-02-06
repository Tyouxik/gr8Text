import db from "../../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../../utils/utilities";

const handler = nc()
  .get(async (req, res) => {
    const { courseId } = req.query;
    const snapshot = await db.doc(`/courses/${courseId}`).get();
    const course = snapshot.data();
    if (!course) {
      res.json("No course");
    } else {
      res.json(course);
    }
  })
  .delete(async (req, res) => {
    const { courseId } = req.query;
    await db.doc(`/courses/${courseId}`).delete();
    res.json("Your course has been successfully deleted");
  });

export default handler;
