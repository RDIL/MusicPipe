import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler, DeleteResponse } from "../../src/basicApiHandler"
import { Artist } from "../../src/api-generated"
import prismaInstance from "../../src/prisma"
import { ValidationError } from "../../src/errors"

class ArtistApiHandler extends BasicApiHandler<Artist> {
    override async delete(
        req: NextApiRequest,
        res: NextApiResponse<DeleteResponse>
    ): Promise<void> {
        const validate = this.createValidator(req)

        validate("id")

        const id = req.body.id as number

        const artist = await prismaInstance.artist.findFirst({
            where: { id },
            select: { id: true, name: true },
        })

        if (!artist) {
            throw new ValidationError("Artist not found")
        }

        await prismaInstance.artist.delete({
            where: { id },
        })

        res.json({ success: true })
    }

    override async create(
        req: NextApiRequest,
        res: NextApiResponse<Artist | string>
    ) {
        const checkField = this.createValidator(req)

        checkField("name")

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
