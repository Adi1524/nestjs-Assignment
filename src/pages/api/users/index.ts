import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Adjust path according to your project

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { username, phone } = req.body;
    const newUser = await prisma.user.create({ data: { username, phone } });
    res.status(201).json(newUser);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
