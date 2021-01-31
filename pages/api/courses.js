import db from "../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../utils/utilities";

const handler = nc().get(async (req, res) => {
  const snapshot = await db.collection("courses").get();
  const courses = snapshot.docs.map(collectIdsAndData);
  console.log({ courses });
  res.json({ courses });
});

export default handler;
