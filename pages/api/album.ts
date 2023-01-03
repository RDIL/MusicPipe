import type { NextApiRequest, NextApiResponse } from "next"
import { Album, ApiAlbum } from "../../src/entities"
import { BasicApiHandler } from "../../src/basicApiHandler"

const apiHandler = new BasicApiHandler<ApiAlbum | string, Album>(
    Album,
    Album.keys,
    // @ts-expect-error Temporary
    null
)

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiAlbum | string>
) {
    apiHandler.dispatch(req, res)
}
