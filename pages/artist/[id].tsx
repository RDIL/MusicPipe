import Head from "next/head"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import React from "react"
import { randomUUID } from "crypto"
import { Tracklist } from "../../src/Tracklist"
import { Artist, Song } from "../../src/api-generated"

interface ArtistProfileProps {
    artist: Artist
    songs: Song[]
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ArtistProfileProps>> {
    console.log(context.params)

    const placeholderArtist = await prisma?.artist.create({
        data: {
            id: randomUUID(),
            name: "Placeholder Artist",
        },
    })!

    const placeholderSong: Song = await prisma?.song.create({
        data: {
            id: randomUUID(),
            title: "Placeholder Song",
            primaryArtistIds: [placeholderArtist.id],
        },
    })!

    return {
        props: {
            artist: placeholderArtist,
            songs: [placeholderSong],
        },
    }
}

export default function ArtistProfile({ artist, songs }: ArtistProfileProps) {
    return (
        <>
            <Head>
                <title>Artist Profile: Test</title>
                <meta name="description" content="MusicPipe" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <main>
                <h1>MusicPipe</h1>

                <p>
                    {artist.name} {artist.id} {JSON.stringify(artist.aliases)}
                </p>

                <Tracklist tracks={songs} />
            </main>
        </>
    )
}
