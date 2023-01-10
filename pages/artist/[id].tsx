import Head from "next/head"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import React from "react"
import { Tracklist } from "../../src/components/Tracklist"
import { Artist } from "../../src/api-generated"
import { CompleteSong, getCompleteSong } from "../../src/apiExtended"
import { ArtistCard } from "../../src/components/ArtistCard"
import { getArtistById, getSongsByArtistId } from "../../src/artistService"

interface ArtistProfileProps {
    artist: Artist
    songs: CompleteSong[]
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

export default function ArtistProfile({ artist, songs }: ArtistProfileProps) {
    return (
        <>
            <Head>
                <title>Artist Profile: Test</title>
            </Head>

            <main>
                <h1>MusicPipe</h1>

                <ArtistCard artist={artist} />

                <Tracklist tracks={songs} />
            </main>
        </>
    )
}
