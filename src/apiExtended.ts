import { Artist, Song } from "./api-generated"
import prismaInstance from "./prisma"

/**
 * A song, but with full artist information.
 */
export interface CompleteSong {
    id: string
    title: string
    primaryArtists: Artist[]
    writers: Artist[]
    producers: Artist[]
    featuredArtists: Artist[]
}

function getArtistById(id: string): Promise<Artist | null> {
    return prismaInstance.artist.findFirst({
        where: {
            id,
        },
    })
}

function removeNulls(array: (Artist | null)[]): Artist[] {
    return array.filter(Boolean) as Artist[]
}

export async function getCompleteSong(song: Song): Promise<CompleteSong> {
    const primaryArtists = await Promise.all(
        song.primaryArtistIds.map(getArtistById)
    )
    const writers = await Promise.all(song.writerIds.map(getArtistById))
    const producers = await Promise.all(song.producerIds.map(getArtistById))
    const featuredArtists = await Promise.all(
        song.featuredArtistIds.map(getArtistById)
    )

    return {
        id: song.id,
        title: song.title,
        primaryArtists: removeNulls(primaryArtists),
        writers: removeNulls(writers),
        producers: removeNulls(producers),
        featuredArtists: removeNulls(featuredArtists),
    }
}
