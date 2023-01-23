import Head from "next/head"
import Link from "next/link"
import {
    AuthenticationProps,
    withPageAuthentication,
} from "../src/withAuthentication"
// import { ReorderableList } from "../src/components/ReorderableList"
// import { Paper } from "@mui/material"

function roleSpecificComponent(role: boolean, component: JSX.Element) {
    return (role && component) || null
}

export default function Home(props: AuthenticationProps) {
    const isAdmin = props.session?.role === "ADMIN"
    const isManager = isAdmin || props.session?.role === "MANAGER"

    return (
        <>
            <Head>
                <title>MusicPipe</title>
            </Head>

            <main>
                <h1>MusicPipe</h1>

                {/*<Paper>*/}
                {/*    <ReorderableList />*/}
                {/*</Paper>*/}

                {props.session ? (
                    <ul>
                        {roleSpecificComponent(
                            isAdmin,
                            <li>
                                <Link href="/settings/users">Manage Users</Link>
                            </li>
                        )}
                        {roleSpecificComponent(
                            isManager,
                            <li>
                                <Link href="/artist/list">All Artists</Link>
                            </li>
                        )}
                    </ul>
                ) : null}
            </main>
        </>
    )
}

export const getServerSideProps = withPageAuthentication({}, async () => ({
    props: {},
}))
