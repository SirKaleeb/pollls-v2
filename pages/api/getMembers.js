import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "GET")
    return res
      .status(400)
      .json({ error: "Only GET requests are accepted via this endpoint :)" });

  const members = await client.member.findMany();
  return res.status(200).json(members);
};
