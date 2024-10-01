import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma"; // Adjust the path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Fetch user profile
    const profile = await prisma.profile.findUnique({
      where: { userId: Number(id) },
    });
    res.json(profile);
  } else if (req.method === "PUT") {
    // Update user profile
    const { email, gender, address, pincode, city, state, country } = req.body;
    const updatedProfile = await prisma.profile.update({
      where: { userId: Number(id) },
      data: {
        email,
        gender,
        address,
        pincode,
        city,
        state,
        country,
      },
    });
    res.json(updatedProfile);
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
