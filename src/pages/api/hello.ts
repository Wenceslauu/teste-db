// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

type Data = {
  users?: User[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    res.status(200).json({ users });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
