import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler } from "../../src/basicApiHandler"
import { Song } from "../../src/api-generated"

// const apiHandler = new BasicApiHandler<Song | string>()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Song | string>
) {
    // TODO
    throw new Error("Not implemented")
    // apiHandler.dispatch(req, res)
}
