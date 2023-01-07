import Head from "next/head"
import { GetServerSidePropsContext } from "next"
import { authOptions } from "./api/auth/[...nextauth]"
import { getToken } from "next-auth/jwt"

export default function Home(props: any) {
    console.log(props)

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
