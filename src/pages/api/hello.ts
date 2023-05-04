// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { User } from "@prisma/client";

type Data = {
	users: User[];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const users = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});

	res.status(200).json({ users });
}
