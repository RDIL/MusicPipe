import { NextApiRequest, NextApiResponse } from "next"
import { ValidationError } from "./errors"

export interface DeleteResponse {
    success: boolean
}

export abstract class BasicApiHandler<ApiType> {
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

    async dispatch(req: NextApiRequest, res: NextApiResponse) {
        try {
            switch (req.method) {
                case "POST":
                    await this.create(req, res)
                    break
                case "PUT":
                    await this.put(req, res)
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

    async put(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        res.status(500).send("Not implemented")
    }

    abstract delete(
        req: NextApiRequest,
        res: NextApiResponse<DeleteResponse>
    ): Promise<void>
}
