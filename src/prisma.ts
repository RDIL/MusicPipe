import { PrismaClient } from "./api-generated"

// @ts-expect-error Untyped global so it's not in code completion
const prismaInstance = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    // @ts-expect-error Untyped global so it's not in code completion
    globalThis.prisma = prismaInstance
}

export default prismaInstance
