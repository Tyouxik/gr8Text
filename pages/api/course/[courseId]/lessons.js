import { db, auth } from "../../../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../../../utils/utilities";

const handler = nc().post(async (req, res) => {
  try {
    const { courseId } = req.query;
    //Check if post request is done by the creator
    const { token } = req.body;
    const { uid } = await auth.verifyIdToken(token);

    const course = await db.doc(`/courses/${courseId}`).get();
    const courseCreator = course.data().creator;
    const creatorCheck = courseCreator === uid;

    if (creatorCheck) {
      const { newLessonTitle } = req.body;
      const lessonsRef = db
        .collection("courses")
        .doc(courseId)
        .collection("lessons");

      const docRef = await lessonsRef.add({
        title: newLessonTitle,
      });
      const doc = await docRef.get();
      const newLesson = collectIdsAndData(doc);
      res.json(newLesson);
    }
  } catch (error) {
    console.log(error);
  }
});

export default handler;
