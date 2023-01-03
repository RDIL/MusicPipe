import type { NextApiRequest, NextApiResponse } from "next"
import { ApiUser, User } from "../../src/entities"
import { BasicApiHandler } from "../../src/basicApiHandler"

const apiHandler = new BasicApiHandler<ApiUser | string, User>(
    User,
    User.keys,
    // @ts-expect-error Temporary
    null
)

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiUser | string>
) {
    apiHandler.dispatch(req, res)
}
