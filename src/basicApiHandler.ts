import { NextApiRequest, NextApiResponse } from "next"

export abstract class BasicApiHandler<ApiType> {
    createValidator(
        req: NextApiRequest,
        res: NextApiResponse<ApiType | string>
    ) {
        return (field: keyof ApiType & string) => {
            if (typeof req.body !== "object") {
                res.status(400).send("Invalid request body")
                return false
            }

            if (!req.body[field]) {
                res.status(400).send(`Field ${field} is required`)
                return false
            }

            return true
        }
    }

    async dispatch(
        req: NextApiRequest,
        res: NextApiResponse<ApiType | string>
    ) {
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
    }

    abstract create(
        req: NextApiRequest,
        res: NextApiResponse<ApiType | string>
    ): Promise<void>

    async put(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        res.status(500).send("Not implemented")
    }

    async delete(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        res.status(500).send("Not implemented")
    }
}
