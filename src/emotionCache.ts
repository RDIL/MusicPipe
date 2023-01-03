import createCache, { type EmotionCache } from "@emotion/cache"

const isBrowser = typeof document !== "undefined"

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache(): EmotionCache {
    let insertionPoint: Element | undefined

    if (isBrowser) {
        const emotionInsertionPoint = document.querySelector(
            'meta[name="emotion-insertion-point"]'
        )
        insertionPoint = emotionInsertionPoint ?? undefined
    }

    // @ts-expect-error I hope this doesn't break.
    return createCache({ key: "mui-style", insertionPoint })
}
