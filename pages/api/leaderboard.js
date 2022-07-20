import { connectToDatabase } from "../../util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("users")
    .find().sort({score: -1})
    .toArray();

  res.json(data);
}
