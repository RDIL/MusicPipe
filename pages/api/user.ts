import type { NextApiRequest, NextApiResponse } from "next"
import { BasicApiHandler, DeleteResponse } from "../../src/basicApiHandler"
import { User } from "../../src/api-generated"
import prismaInstance from "../../src/prisma"
import { hashPassword } from "../../src/accountService"
import { ValidationError } from "../../src/errors"

class UserApiHandler extends BasicApiHandler<User> {
    override async delete(
        req: NextApiRequest,
        res: NextApiResponse<DeleteResponse>
    ): Promise<void> {
        const validate = this.createValidator(req)

        validate("id")

        const id = req.body.id as number

        const user = await prismaInstance.user.findFirst({
            where: { id },
            select: { id: true, name: true },
        })

        if (!user) {
            throw new ValidationError("User not found")
        }

        await prismaInstance.user.delete({
            where: { id },
        })

        res.json({ success: true })
    }

    override async create(
        req: NextApiRequest,
        res: NextApiResponse<User | string>
    ) {
        const validate = this.createValidator(req)

        validate("name")
        validate("username")
        validate("role")

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
