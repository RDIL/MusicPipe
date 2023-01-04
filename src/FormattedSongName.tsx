import React, { useMemo } from "react"
import Link from "next/link"
import { FormattedArtistList } from "./FormattedArtistList"
import { Artist, Song } from "./api-generated"

export interface FormattedSongNameProps {
    song: Song
    featuredArtists: Artist[]
}

export function FormattedSongName({
    song,
    featuredArtists,
}: FormattedSongNameProps) {
    const featuredDetails = useMemo(() => {
        if (featuredArtists.length < 1) {
            return <span></span>
        }

        return (
            <span>
                {" "}
                (feat. <FormattedArtistList artists={featuredArtists} />)
            </span>
        )
    }, [featuredArtists])

    return (
        <span>
            <Link href={`/song/${song.id}`}>{song.title}</Link>
            {featuredDetails}
        </span>
    )
}
