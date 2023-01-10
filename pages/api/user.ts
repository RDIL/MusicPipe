import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler } from "../../src/basicApiHandler"
import { User } from "../../src/api-generated"
import prismaInstance from "../../src/prisma"
import { hashPassword } from "../../src/accountService"

class UserApiHandler extends BasicApiHandler<User> {
    override async create(
        req: NextApiRequest,
        res: NextApiResponse<User | string>
    ) {
        const checkField = this.createValidator(req, res)

        if (!checkField("name")) return
        if (!checkField("username")) return
        if (!checkField("role")) return

        const user = req.body as User

        const withName = await prismaInstance.user.findFirst({
            where: { name: user.name },
        })

        if (withName) {
            res.status(412).json("Artist already exists")
            return
        }

        await prismaInstance.user.create({
            data: {
                name: user.name,
                username: user.username,
                role: user.role,
                password: await hashPassword("password"),
            },
        })

        res.status(201).send("done")
    }
}

const apiHandler = new UserApiHandler()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | string>
) {
    await apiHandler.dispatch(req, res)
}
