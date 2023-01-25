import React from "react"
import Head from "next/head"
import styles from "../src/styles/error.module.css"
import clsx from "clsx"
import Link from "next/link"

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Not Found</title>
            </Head>

            <main className={clsx(styles.main, "no-margin")}>
                <h1 className={styles.heading}>Not Found</h1>

                <p>
                    The page you are looking for does not exist. You may have
                    mistyped the address or the page may have moved.
                </p>

                <Link href="/">Go back home</Link>
            </main>
        </>
    )
}
