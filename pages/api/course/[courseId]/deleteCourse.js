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
      //request from the course creator
      await db.doc(`/courses/${courseId}`).delete();
      res.status(200).json("Your course has been successfully deleted");
    } else {
      //unauthorized request from someone else
      res.status(401).json("Your are not the author of this course");
    }
  } catch (error) {
    console.log(error);
  }
});

export default handler;
