import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { type User } from "../../../src/api-generated"
import prismaInstance from "../../../src/prisma"
import { comparePassword } from "../../../src/accountService"
import { randomUUID } from "crypto"

/** 30 days, 24 hours in a day, 60 minutes in an hour, 60 seconds in a minute */
const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60

const authorize = async (
    credentials: Record<"username" | "password", string> | undefined
) => {
    if (!credentials?.username || !credentials?.password) {
        return null
    }

    const dbAccount: User | null = await prismaInstance.user.findUnique({
        where: {
            username: credentials.username,
        },
        select: {
            id: true,
            username: true,
            password: true,
            name: true,
        },
    })

    if (!dbAccount) {
        console.log("No account found for username: " + credentials.username)
        return null
    }

    if (
        // dbAccount.password &&
        await comparePassword(credentials.password, dbAccount.password)
    ) {
        // clone of dbAccount, but with password removed
        const account = {
            id: dbAccount.id,
            username: dbAccount.username,
            name: dbAccount.name,
            email: null,
            image: null,
        }

        console.log("User authenticated", dbAccount)
        return account
    }

    console.log("Fall-through: invalid username or password")
    return null
}

export const authOptions: AuthOptions = {
    // TODO: these are for TESTING ONLY!
    debug: true,
    secret: process.env.JWT_SECRET || "uYtViNbbSJflFNsbaHFa",
    providers: [
        CredentialsProvider({
            name: "MusicPipe",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "mary.smith",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                delete token.email
                delete token.picture
            }

            return token
        },
    },
    session: {
        strategy: "jwt",
        maxAge: THIRTY_DAYS_IN_SECONDS,
        generateSessionToken: () => randomUUID(),
    },
}

export default NextAuth(authOptions)
