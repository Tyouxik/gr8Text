import { db, auth } from "../../../../../../utils/db/index";
import nc from "next-connect";

const handler = nc().post(async (req, res) => {
  try {
    const { courseId, lessonId } = req.query;
    //Check if post request is done by the creator
    const { token } = req.body;
    const { uid } = await auth.verifyIdToken(token);

    const course = await db.doc(`/courses/${courseId}`).get();
    const courseCreator = course.data().creator;
    const creatorCheck = courseCreator === uid;

    console.log({ uid, courseCreator, creatorCheck });

    if (creatorCheck) {
      await db.doc(`/courses/${courseId}/lessons/${lessonId}`).delete();
      res.json("Your lesson has been successfully deleted");
    } else {
      res.json("You are not the author of this course");
    }
  } catch (error) {
    console.log(error);
  }

  const { courseId, lessonId } = req.query;
});

export default handler;
