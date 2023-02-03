import { Prisma, PrismaClient } from "./api-generated"
import MiddlewareParams = Prisma.MiddlewareParams

// @ts-expect-error Untyped global so it's not in code completion
const prismaInstance = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    // @ts-expect-error Untyped global so it's not in code completion
    globalThis.prisma = prismaInstance

    prismaInstance.$use(
        async (params: MiddlewareParams, next: (params: any) => any) => {
            const before = Date.now()

            const result = await next(params)

            const after = Date.now()

            console.log(
                `Query ${params.model}.${params.action} took ${
                    after - before
                }ms`
            )

            return result
        }
    )
}

export default prismaInstance
