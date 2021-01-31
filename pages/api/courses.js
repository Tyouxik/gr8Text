import db from "../../utils/db/index";
import nc from "next-connect";

const handler = nc().get(async (req, res) => {
  const snapshot = await db.collection("courses").get();
  const courses = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  console.log({ courses });
  res.json({ courses });
});

export default handler;
