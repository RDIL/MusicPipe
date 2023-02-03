import { NextApiRequest, NextApiResponse } from "next"
import { ValidationError } from "./errors"

export interface DeleteResponse {
    success: boolean
}

export abstract class BasicApiHandler<
    ApiType extends { id: string },
    Delegate
> {
    createValidator(req: NextApiRequest) {
        return (field: keyof ApiType & string) => {
            if (typeof req.body !== "object") {
                throw new ValidationError("Invalid request body")
            }

            if (!req.body[field]) {
                throw new ValidationError(`Field ${field} is required`)
            }
        }
    }

    abstract get prismaDelegate(): Delegate

    abstract get typeName(): string

    async modify(req: NextApiRequest, res: NextApiResponse): Promise<void> {
        // fetch the user to modify:
        const validate = this.createValidator(req)

        validate("id")

        const id = req.body.id as string

        // @ts-expect-error All the delegates have a findFirst method
        const thing = await this.prismaDelegate.findFirst({
            where: { id },
        })

        if (!thing) {
            throw new ValidationError(`${this.typeName} not found`)
        }

        // @ts-expect-error All the delegates have a update method
        await this.prismaDelegate.update({
            where: { id },
            data: req.body,
        })

        res.json({ success: true })
    }

    async delete(
        req: NextApiRequest,
        res: NextApiResponse<DeleteResponse>
    ): Promise<void> {
        const validate = this.createValidator(req)

        validate("id")

        const id = req.body.id as string

        // @ts-expect-error All the delegates have a findFirst method
        const thing = await this.prismaDelegate.findFirst({
            where: { id },
            select: { id: true },
        })

        if (!thing) {
            throw new ValidationError(`${this.typeName} not found`)
        }

        // @ts-expect-error All the delegates have a findFirst method
        await this.prismaDelegate.delete({
            where: { id },
        })

        res.json({ success: true })
    }

    async dispatch(req: NextApiRequest, res: NextApiResponse) {
        try {
            switch (req.method) {
                case "POST":
                    await this.create(req, res)
                    break
                case "PUT":
                    await this.modify(req, res)
                    break
                case "DELETE":
                    await this.delete(req, res)
                    break
                default:
                    res.status(400).send(
                        `The HTTP ${req.method} method is not supported at this route.`
                    )
                    return
            }
        } catch (e) {
            if (e instanceof ValidationError) {
                res.status(400).send(e.message)
                return
            }

            throw e
        }
    }

    abstract create(
        req: NextApiRequest,
        res: NextApiResponse<ApiType | string>
    ): Promise<void>
}
