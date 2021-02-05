import db from "../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../utils/utilities";

const handler = nc()
  .get(async (req, res) => {
    const snapshot = await db.collection("courses").get();
    const courses = snapshot.docs.map(collectIdsAndData);
    res.json(courses);
  })
  .post(async (req, res) => {
    const { newCourseTitle } = req.body;
    const course = {
      title: newCourseTitle,
      category: "freebie",
      access: "private",
    };
    const docRef = await db.collection("courses").add(course);
    const doc = await docRef.get();
    const newCourse = collectIdsAndData(doc);
    res.json(newCourse);
  });
export default handler;
