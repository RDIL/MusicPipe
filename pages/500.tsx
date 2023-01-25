import React from "react"
import Head from "next/head"
import styles from "../src/styles/error.module.css"
import clsx from "clsx"
import Link from "next/link"

export default function ServerError() {
    return (
        <>
            <Head>
                <title>Server Error</title>
            </Head>

            <main className={clsx(styles.main, "no-margin")}>
                <h1 className={styles.heading}>Server Error</h1>

                <p>An error occurred on the server. Please try again later.</p>

                <Link href="/">Go back home</Link>
            </main>
        </>
    )
}
