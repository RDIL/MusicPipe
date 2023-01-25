import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler } from "../../src/basicApiHandler"
import { Song, User } from "../../src/api-generated"
import prismaInstance from "../../src/prisma"

class SongApiHandler extends BasicApiHandler<Song, typeof prismaInstance.song> {
    override get prismaDelegate() {
        return prismaInstance.song
    }

    override get typeName() {
        return "Song"
    }

    override async create(
        req: NextApiRequest,
        res: NextApiResponse<Song | string>
    ) {
        const validate = this.createValidator(req)

        validate("title")
        validate("primaryArtistIds")

        const song = req.body as Song

        const withName = await prismaInstance.song.findFirst({
            where: { title: song.title },
        })

        if (withName) {
            res.status(412).json("Song already exists")
            return
        }

        await prismaInstance.song.create({
            data: {
                title: song.title,
                primaryArtistIds: song.primaryArtistIds,
            },
        })

        res.status(201).send("done")
    }
}

const apiHandler = new SongApiHandler()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | string>
) {
    await apiHandler.dispatch(req, res)
}
