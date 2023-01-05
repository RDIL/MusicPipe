import Head from "next/head"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import React from "react"
import { randomUUID } from "crypto"
import { Tracklist } from "../../src/components/Tracklist"
import { Artist, Song } from "../../src/api-generated"
import prismaInstance from "../../src/prisma"
import { CompleteSong, getCompleteSong } from "../../src/apiExtended"
import { ArtistCard } from "../../src/components/ArtistCard"

interface ArtistProfileProps {
    artist: Artist
    songs: CompleteSong[]
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ArtistProfileProps>> {
    console.log(context.params)

    const placeholderArtist = await prismaInstance.artist.create({
        data: {
            id: randomUUID(),
            name: "Placeholder Artist",
        },
    })!

    const placeholderSong: Song = await prismaInstance.song.create({
        data: {
            id: randomUUID(),
            title: "Placeholder Song",
            primaryArtistIds: [placeholderArtist.id],
        },
    })!

    // get songs by artist
    // const songs = await prismaInstance.song.findMany({
    //     where: {
    //         primaryArtistIds: {
    //             has: context.params!.id,
    //         },
    //     },
    // })

    const completeSong = await getCompleteSong(placeholderSong)

    return {
        props: {
            artist: placeholderArtist,
            songs: [completeSong],
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

                <ArtistCard artist={artist} />

                <Tracklist tracks={songs} />
            </main>
        </>
    )
}
