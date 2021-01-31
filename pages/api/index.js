import firebase from "../../utils/db/index";
import nc from "next-connect";

const handler = nc()
  .get((req, res) => {
    res.json({ message: "this is get" });
  })
  .post((req, res) => {
    res.json({ message: "this is post" });
  });
export default handler;
