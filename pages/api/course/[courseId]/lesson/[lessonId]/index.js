import { db } from "../../../../../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../../../../../utils/utilities";

const handler = nc().post(async (req, res) => {
  try {
    const { courseId, lessonId } = req.query;
    const { key, content } = req.body;
    const lessonRef = db
      .collection("courses")
      .doc(courseId)
      .collection("lessons")
      .doc(lessonId);

    await lessonRef.update({ [key]: content });
    const updatedLessonRef = await lessonRef.get();
    const updatedLesson = collectIdsAndData(updatedLessonRef);
    res.json(updatedLesson);
  } catch (error) {
    console.log({ error });
  }
});

export default handler;
