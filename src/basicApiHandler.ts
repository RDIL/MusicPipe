import { NextApiRequest, NextApiResponse } from "next"

export class BasicApiHandler<ApiType> {
    dispatch(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        switch (req.method) {
            case "POST":
                this.post(req, res)
                break
            case "PUT":
                this.put(req, res)
                break
            case "DELETE":
                this.delete(req, res)
                break
            default:
                res.status(400).send(
                    `The HTTP ${req.method} method is not supported at this route.`
                )
                return
        }
    }

    async post(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        res.status(500).send("Not implemented")
    }

    async put(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        res.status(500).send("Not implemented")
    }

    async delete(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        res.status(500).send("Not implemented")
    }
}
