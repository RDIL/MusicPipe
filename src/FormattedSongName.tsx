import React, { useMemo } from "react"
import { ApiSong } from "./entities"
import Link from "next/link"
import { FormattedArtistList } from "./FormattedArtistList"

export interface FormattedSongNameProps {
    song: ApiSong
}

export function FormattedSongName({ song }: FormattedSongNameProps) {
    const featuredDetails = useMemo(() => {
        if (song.featuredArtists.length < 1) {
            return <span></span>
        }

        return (
            <span>
                {" "}
                (feat. <FormattedArtistList artists={song.featuredArtists} />)
            </span>
        )
    }, [song.featuredArtists])

    return (
        <span>
            <Link href={`/song/${song.id}`}>{song.title}</Link>
            {featuredDetails}
        </span>
    )
}
