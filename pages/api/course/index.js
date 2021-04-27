import { db, auth } from "../../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../../utils/utilities";

const handler = nc()
  .get(async (req, res) => {
    console.log("I am called");
    const { token } = req.headers;
    const { uid } = await auth.verifyIdToken(token);
    const coursesRef = await db
      .collection("courses")
      .where("creator", "=", uid)
      .get();
    const courses = coursesRef.docs.map(collectIdsAndData);
    res.json(courses);
  })
  .post(async (req, res) => {
    try {
      const {
        newCourseTitle,
        newCourseCategory,
        newCoursePrice,
        token,
      } = req.body;

      const { uid } = await auth.verifyIdToken(token);

      const course = {
        title: newCourseTitle,
        category: newCourseCategory,
        access: "private",
        creator: uid,
      };

      const docRef = await db.collection("courses").add(course);
      const doc = await docRef.get();
      const newCourse = collectIdsAndData(doc);
      res.json(newCourse);
    } catch (err) {
      console.log(err);
    }
  });
export default handler;
