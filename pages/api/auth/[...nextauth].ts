import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "../../../src/api-generated"

export default NextAuth({
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
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = {
                    id: "1",
                    name: "J Smith",
                    email: "jsmith@example.com",
                }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    adapter: PrismaAdapter(new PrismaClient()),
})
