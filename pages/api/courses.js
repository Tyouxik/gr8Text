import { db } from "../../utils/db/index";
import nc from "next-connect";
import { collectIdsAndData } from "../../utils/utilities";

const handler = nc().get(async (req, res) => {
  const snapshot = await db
    .collection("courses")
    .where("access", "==", "public")
    .get();

  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  const courses = snapshot.docs.map(collectIdsAndData);
  res.status(200).json({ courses });
});

export default handler;
