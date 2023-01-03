import React from "react"
import { ApiArtist } from "./entities"
import Link from "next/link"

export interface FormattedArtistListProps {
    artists: ApiArtist[]
}

export function FormattedArtistList({ artists }: FormattedArtistListProps) {
    if (artists.length < 1) {
        return <span></span>
    }

    return (
        <span>
            {artists
                .map((artist) => (
                    <Link href={`/artist/${artist.id}`} key={artist.id}>
                        {artist.name}
                    </Link>
                ))
                .reduce((prev, curr) =>
                    // @ts-expect-error We're fine
                    [prev, <>{", "}</>, curr]
                )}
            )
        </span>
    )
}
