import { Alert } from "@mui/material"
import React from "react"
import { useRouter } from "next/router"

export const enum LoadingState {
    Idle,
    Loading,
    Success,
    Error,
}

type UsePageApiData = {
    alertBox: JSX.Element
    status: LoadingState
    mutate: (options: RequestInit, reloadOnMutate: boolean) => void
}

export function usePageApi(url: string): UsePageApiData {
    const [status, setStatus] = React.useState<LoadingState>(LoadingState.Idle)
    const router = useRouter()

    const mutate = React.useCallback(
        (options: RequestInit, reloadOnMutate: boolean) => {
            setStatus(LoadingState.Loading)
            fetch(url, options)
                .then((resp) => {
                    if (resp.status >= 400) {
                        setStatus(LoadingState.Error)
                        return
                    }

                    setStatus(LoadingState.Success)
                    if (reloadOnMutate) {
                        router.replace(router.asPath, router.asPath)
                    }
                })
                .catch(() => setStatus(LoadingState.Error))
        },
        [router, url]
    )

    return { status, mutate, alertBox: <StatusAlert status={status} /> }
}

function StatusAlert({ status }: { status: LoadingState }) {
    switch (status) {
        case LoadingState.Idle:
            return null
        case LoadingState.Loading:
            return (
                <Alert variant="filled" color="info">
                    Loading...
                </Alert>
            )
        case LoadingState.Success:
            return (
                <Alert variant="filled" color="success">
                    Success!
                </Alert>
            )
        case LoadingState.Error:
            return (
                <Alert variant="filled" color="error">
                    Error!
                </Alert>
            )
    }
}
