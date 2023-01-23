import * as React from "react"
import Head from "next/head"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider } from "@emotion/react"
import theme from "../src/theme"
import { createEmotionCache } from "../src/emotionCache"
import type { AppProps } from "next/app"
import type { EmotionCache } from "@emotion/cache"
import "../src/styles/global.css"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type AdditionalProps = {
    emotionCache?: EmotionCache
}

export default function MyApp(props: AppProps & AdditionalProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    )
}
