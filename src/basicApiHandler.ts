import { NextApiRequest, NextApiResponse } from "next"
import { DataSource } from "typeorm"
import { JsonStringifyable } from "./entities"

export class BasicApiHandler<ApiType, BaseType extends JsonStringifyable> {
    constructor(
        private readonly entity: new () => BaseType,
        private readonly keys: string[],
        private readonly dataSource: DataSource
    ) {}

    dispatch(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        switch (req.method) {
            case "GET":
                this.get(req, res)
                break
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

    async get(req: NextApiRequest, res: NextApiResponse<ApiType | string>) {
        const id = req.query.id as string

        const entity: BaseType | null = await this.dataSource.manager.findOne(
            this.entity,
            {
                where: {
                    // @ts-expect-error Whatever
                    id,
                },
                // @ts-expect-error Whatever
                select: this.keys,
            }
        )

        if (entity) {
            res.status(200).json(entity.toJSON())
            return
        }

        res.status(404).send(`No ${this.entity.name} found with id: ${id}`)
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
