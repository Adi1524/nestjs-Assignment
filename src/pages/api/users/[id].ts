import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Adjust path according to your project

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    res.status(200).json(user);
  } else if (req.method === "PUT") {
    const { username, phone } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { username, phone },
    });
    res.status(200).json(updatedUser);
  } else if (req.method === "DELETE") {
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
