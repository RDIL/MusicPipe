import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler } from "../../src/basicApiHandler"
import { Album } from "../../src/api-generated"
import prismaInstance from "../../src/prisma"

class AlbumApiHandler extends BasicApiHandler<
    Album,
    typeof prismaInstance.album
> {
    override create(
        req: NextApiRequest,
        res: NextApiResponse<string | Album>
    ): Promise<void> {
        return Promise.resolve(undefined)
    }

    override get prismaDelegate(): typeof prismaInstance.album {
        return prismaInstance.album
    }

    override get typeName(): string {
        return "Album"
    }
}

// const apiHandler = new AlbumApiHandler()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Album | string>
) {
    // TODO
    throw new Error("Not implemented")
    // apiHandler.dispatch(req, res)
}
