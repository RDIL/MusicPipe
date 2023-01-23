import React from "react"
import Head from "next/head"
import styles from "../src/styles/unauthorized.module.css"
import clsx from "clsx"
import Link from "next/link"

export default function Unauthorized() {
    return (
        <>
            <Head>
                <title>Unauthorized</title>
            </Head>

            <main className={clsx(styles.main, "no-margin")}>
                <h1 className={styles.heading}>Unauthorized</h1>

                <p>
                    You do not have permission to view this page. Are you on the
                    correct account?
                </p>

                <Link href="/">Go back home</Link>
            </main>
        </>
    )
}
