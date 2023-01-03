import Head from "next/head"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import React from "react"
import { randomUUID } from "crypto"
import { Tracklist } from "../../src/Tracklist"
import { ApiArtist, ApiSong, Artist, Song } from "../../src/entities"

interface ArtistProfileProps {
    artist: ApiArtist
    songs: ApiSong[]
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ArtistProfileProps>> {
    console.log(context.params)

    const placeholderArtist = Artist.from(randomUUID(), "Placeholder Artist")

    const placeholderSong = Song.from(randomUUID(), "Placeholder Song")
    placeholderSong.primaryArtists = [placeholderArtist]
    placeholderSong.producers = [placeholderArtist]
    placeholderSong.writers = [placeholderArtist]
    placeholderSong.albums = []
    placeholderSong.featuredArtists = []

    return {
        props: {
            artist: placeholderArtist.toJSON(),
            songs: [placeholderSong.toJSON()],
        },
    }
}

export default function ArtistProfile({ artist, songs }: ArtistProfileProps) {
    return (
        <>
            <Head>
                <title>Artist Profile: Test</title>
                <meta name="description" content="MusicMeta" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <main>
                <h1>MusicMeta</h1>

                <Tracklist tracks={songs}></Tracklist>
            </main>
        </>
    )
}
