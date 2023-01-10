import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler } from "../../src/basicApiHandler"
import { Artist } from "../../src/api-generated"
import prismaInstance from "../../src/prisma"

class ArtistApiHandler extends BasicApiHandler<Artist> {
    override async create(
        req: NextApiRequest,
        res: NextApiResponse<Artist | string>
    ) {
        const checkField = this.createValidator(req, res)

        if (!checkField("name")) return

        const artist = req.body as Artist

        const withName = await prismaInstance.artist.findFirst({
            where: { name: artist.name },
        })

        if (withName) {
            res.status(412).json("Artist already exists")
            return
        }

        await prismaInstance.artist.create({
            data: {
                name: artist.name,
            },
        })

        res.status(201).send("done")
    }
}

const apiHandler = new ArtistApiHandler()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Artist | string>
) {
    await apiHandler.dispatch(req, res)
}
