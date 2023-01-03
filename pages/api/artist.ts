import type { NextApiRequest, NextApiResponse } from "next"
import { ApiArtist, Artist } from "../../src/entities"
import { BasicApiHandler } from "../../src/basicApiHandler"

const apiHandler = new BasicApiHandler<ApiArtist | string, Artist>(
    Artist,
    Artist.keys,
    // @ts-expect-error Temporary
    null
)

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiArtist | string>
) {
    apiHandler.dispatch(req, res)
}
