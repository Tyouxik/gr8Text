import db from "../../../../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../../../../utils/utilities";

const handler = nc().delete(async (req, res) => {
  const { courseId, lessonId } = req.query;
  await db.doc(`/courses/${courseId}/lessons/${lessonId}`).delete();
  res.json("Your lesson has been successfully deleted");
});

export default handler;
