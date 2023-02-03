import Head from "next/head"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import React from "react"
import { Tracklist } from "../../src/components/Tracklist"
import { Artist } from "../../src/api-generated"
import { CompleteSong, getCompleteSong } from "../../src/apiExtended"
import { ArtistCard } from "../../src/components/ArtistCard"
import { getArtistById, getSongsByArtistId } from "../../src/artistService"
import { MarginBottomButton } from "../../src/components/MarginBottomButton"
import { CircularProgress } from "@mui/material"
import dynamic from "next/dynamic"
import { Song } from "../../src/api-generated"
import { LoadingState, usePageApi } from "../../src/components/hooks/usePageApi"

interface ArtistProfileProps {
    artist: Artist
    songs: CompleteSong[]
}

const LazyCreateUserDialog = dynamic(
    () => import("../../src/components/CreateSongDialog"),
    {
        loading: () => <CircularProgress disableShrink />,
        ssr: true,
    }
)

function randomCuid() {
    return Math.random().toString(36).substring(2, 15)
}

function getBody(
    song: Partial<Song>,
    songId: string,
    binary: string,
    mime: string,
    artist: Artist
) {
    return JSON.stringify({
        ...song,
        id: songId,
        primaryArtistIds: [artist.id],
        rawFile: binary,
        rawMime: mime,
    })
}

export default function ArtistProfile({ artist, songs }: ArtistProfileProps) {
    const [creatingNew, setCreatingNew] = React.useState(false)
    const songsApi = usePageApi("/api/song")

    const createSongCallback = (
        song: Partial<Song>,
        binary: string,
        mime: string
    ) => {
        setCreatingNew(false)
        const songId = randomCuid()
        songsApi.mutate(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: getBody(song, songId, binary, mime, artist),
            },
            true
        )
    }

    return (
        <main style={{ display: "flex", flexDirection: "column" }}>
            <Head>
                <title>{artist.name}</title>
            </Head>

            <h1>MusicPipe</h1>

            {creatingNew ? (
                <LazyCreateUserDialog
                    callback={createSongCallback}
                    cancel={() => setCreatingNew(false)}
                />
            ) : null}

            <ArtistCard artist={artist} />

            <MarginBottomButton
                variant="outlined"
                onClick={() => setCreatingNew(true)}
                style={{ margin: "32px auto 0" }}
            >
                Add New Song
            </MarginBottomButton>

            {songsApi.status === LoadingState.Loading ? (
                <CircularProgress disableShrink />
            ) : null}
            {songsApi.alertBox}

            <Tracklist tracks={songs} />
        </main>
    )
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ArtistProfileProps>> {
    const artist = context.params?.id as string | undefined

    if (!artist) {
        return {
            notFound: true,
        }
    }

    const artistObj = await getArtistById(artist)

    if (!artistObj) {
        return {
            notFound: true,
        }
    }

    const songs = await getSongsByArtistId(artist)

    return {
        props: {
            artist: artistObj,
            songs: await Promise.all(
                songs.map((song) => getCompleteSong(song))
            ),
        },
    }
}
