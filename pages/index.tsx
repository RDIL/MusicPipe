import Head from "next/head"
import { GetServerSidePropsContext } from "next"
import { authOptions } from "./api/auth/[...nextauth]"
import { getToken, JWT } from "next-auth/jwt"
import Link from "next/link"

interface HomeProps {
    session: JWT | null
}

export default function Home(props: HomeProps) {
    const isAdmin = props.session?.role === "ADMIN"

    return (
        <>
            <Head>
                <title>MusicPipe</title>
                <meta name="description" content="MusicPipe" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <main>
                <h1>MusicPipe</h1>

                {props.session ? (
                    <ul>
                        {(isAdmin && (
                            <li>
                                <Link href="/settings/users">Manage Users</Link>
                            </li>
                        )) ||
                            null}
                    </ul>
                ) : null}
            </main>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = await getToken({
        req: context.req,
        secret: authOptions.secret,
    })

    return {
        props: {
            session: token,
        },
    }
}
