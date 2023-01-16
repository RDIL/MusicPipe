/// <reference types="node" />

declare module "next-auth/jwt" {
    import type { GetServerSidePropsContext, NextApiRequest } from "next"
    import type { NextRequest } from "next/server"
    import type { LoggerInstance, Awaitable } from "next-auth"
    import type { UserRole } from "./src/api-generated"

    export interface DefaultJWT extends Record<string, unknown> {
        name?: string | null
        sub?: string
    }

    /**
     * Returned by the `jwt` callback and `getToken`, when using JWT sessions
     *
     * [`jwt` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) | [`getToken`](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken)
     */
    export interface JWT extends Record<string, unknown>, DefaultJWT {
        role: UserRole
        username: string
    }

    export interface JWTEncodeParams {
        /** The JWT payload. */
        token?: JWT

        /** The secret used to encode the NextAuth.js issued JWT. */
        secret: string | Buffer

        /**
         * The maximum age of the NextAuth.js issued JWT in seconds.
         * @default 30 * 24 * 30 * 60 // 30 days
         */
        maxAge?: number
    }

    export interface JWTDecodeParams {
        /** The NextAuth.js issued JWT to be decoded */
        token?: string

        /** The secret used to decode the NextAuth.js issued JWT. */
        secret: string | Buffer
    }

    export interface JWTOptions {
        /**
         * The maximum age of the NextAuth.js issued JWT in seconds.
         * @default 30 * 24 * 30 * 60 // 30 days
         */
        maxAge: number

        /** Override this method to control the NextAuth.js issued JWT encoding. */
        encode: (params: JWTEncodeParams) => Awaitable<string>

        /** Override this method to control the NextAuth.js issued JWT decoding. */
        decode: (params: JWTDecodeParams) => Awaitable<JWT | null>
    }

    export interface GetTokenParams<R extends boolean = false> {
        /** The request containing the JWT either in the cookies or in the `Authorization` header. */
        req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest

        /**
         * Use secure prefix for cookie name, unless URL in `NEXTAUTH_URL` is http://
         * or not set (e.g. development or test instance) case use unprefixed name
         */
        secureCookie?: boolean

        /** If the JWT is in the cookie, what name `getToken()` should look for. */
        cookieName?: string

        /**
         * `getToken()` will return the raw JWT if this is set to `true`
         * @default false
         */
        raw?: R

        /**
         * The same `secret` used in the `NextAuth` configuration.
         * Defaults to the `NEXTAUTH_SECRET` environment variable.
         */
        secret?: string

        decode?: JWTOptions["decode"]

        logger?: LoggerInstance | Console
    }

    /**
     * Takes a NextAuth.js request (`req`) and returns either the NextAuth.js issued JWT's payload,
     * or the raw JWT string. We look for the JWT in the either the cookies, or the `Authorization` header.
     * [Documentation](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken)
     */
    export declare function getToken<R extends boolean = false>(
        params: GetTokenParams<R>
    ): Promise<R extends true ? string : JWT | null>
}
