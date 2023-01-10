import { NextApiRequest, NextApiResponse } from "next"
import prismaInstance from "../../src/prisma"

// TODO: remove once support for adding artists in the app works

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await prismaInstance.artist.create({
        data: {
            id: "clcp0lzbw00007606ayhtkijf",
            name: "Test Artist",
        },
    })

    res.status(200).send("done")
}
