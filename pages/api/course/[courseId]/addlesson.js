import db from "../../../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../../../utils/utilities";

const startContent = {
  blocks: [
    {
      key: "16d0k",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "98peq",
      text: "Wake up at a regular time ",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "6lbia",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: "49tel",
      text: "Sleep is essential, you should make it a priority.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 20,
          style: "BOLD",
        },
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "fe2gn",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

const handler = nc().post(async (req, res) => {
  try {
    const { courseId } = req.query;
    const { newLessonTitle } = req.body;
    const lessonsRef = db
      .collection("courses")
      .doc(courseId)
      .collection("lessons");

    const docRef = await lessonsRef.add({
      title: newLessonTitle,
      content: startContent,
    });
    const doc = await docRef.get();
    const newLesson = collectIdsAndData(doc);
    res.json(newLesson);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
