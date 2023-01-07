import { NextApiRequest, NextApiResponse } from "next"
import { createUser } from "../../src/accountService"
import { UserRole } from "../../src/api-generated"

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await createUser("Test User", "test", "testing", UserRole.ARTIST)

    res.status(200).send("done")
}
