import { getSession } from "next-auth/react"
import React from "react"
import AccessDenied from "../src/AccessDenied"
import { Session } from "next-auth"
import { GetServerSidePropsContext } from "next"

interface UserTestPageProps {
    session: Session
}

export default function UserTestPage({ session }: UserTestPageProps) {
    // If no session exists, display access denied message
    if (!session) {
        return <AccessDenied />
    }

    // If session exists, display content
    return (
        <div>
            <h1>Protected Page</h1>
            <p>
                <strong>Welcome {session.user!.name}</strong>
            </p>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)

    return {
        props: {
            session,
        },
    }
}
