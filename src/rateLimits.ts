import rateLimit from "express-rate-limit"
import slowDown from "express-slow-down"
import { NextApiRequest, NextApiResponse } from "next"

const applyMiddleware =
    (
        middleware: (
            request: NextApiRequest,
            response: NextApiResponse,
            callback: (result: unknown) => void
        ) => void
    ) =>
    (request: NextApiRequest, response: NextApiResponse) =>
        new Promise((resolve, reject) => {
            middleware(request, response, (result: unknown) =>
                result instanceof Error ? reject(result) : resolve(result)
            )
        })

const getIP = (request: NextApiRequest) =>
    request.headers["x-forwarded-for"] ||
    request.headers["x-real-ip"] ||
    request.socket.remoteAddress

export const getRateLimitMiddlewares = ({
    limit = 10,
    windowMs = 60 * 1000,
    delayAfter = Math.round(10 / 2),
    delayMs = 500,
} = {}) => [
    // @ts-expect-error
    slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
    // @ts-expect-error
    rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
]

const middlewares = getRateLimitMiddlewares()

export async function applyRateLimit(
    request: NextApiRequest,
    response: NextApiResponse
) {
    await Promise.all(
        middlewares
            .map(applyMiddleware)
            .map((middleware) => middleware(request, response))
    )
}
