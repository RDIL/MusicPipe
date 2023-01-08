import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler } from "../../src/basicApiHandler"
import { Album } from "../../src/api-generated"

// const apiHandler = new BasicApiHandler<Album | string>()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Album | string>
) {
    // TODO
    throw new Error("Not implemented")
    // apiHandler.dispatch(req, res)
}
