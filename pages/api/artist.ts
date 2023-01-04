import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler } from "../../src/basicApiHandler"
import { Artist } from "../../src/api-generated"

const apiHandler = new BasicApiHandler<Artist | string>()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Artist | string>
) {
    apiHandler.dispatch(req, res)
}
