import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "POST")
    return res
      .status(400)
      .json({ error: "Only POST requests are accepted via this endpoint :)" });

  let { username, firstName, lastName, email, password, bio, polls } = req.body;
  let isBanned,
    isStaff = false;

  if (!username)
    return res.status(400).json({ error: "No username was passed." });
  if (!email) return res.status(400).json({ error: "No email was passed." });
  if (!password)
    return res.status(400).json({ error: "No password was passed." });

  password = await bcrypt.hash(password, 12);

  if (!firstName) firstName = null;
  if (!lastName) lastName = null;
  if (!bio) bio = null;
  if (!polls) polls = [];

  try {
    const newMember = await client.member.create({
      username,
      firstName,
      lastName,
      email,
      password,
      bio,
      polls,
      isBanned,
      isStaff,
    });

    res.status(200).json(newMember);
  } catch (e) {
    res.status(500).json({ error: e });
  } finally {
    client.$disconnect();
  }

  return;
};
