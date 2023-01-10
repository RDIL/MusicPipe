import prismaInstance from "./prisma"
import { Artist, Song } from "./api-generated"

export async function getArtistById(id: string): Promise<Artist | null> {
    return prismaInstance.artist.findUnique({
        where: {
            id,
        },
    })
}

export function getSongsByArtistId(id: string): Promise<Song[]> {
    return prismaInstance.song.findMany({
        where: {
            OR: [
                {
                    primaryArtistIds: {
                        has: id,
                    },
                },
                {
                    featuredArtistIds: {
                        has: id,
                    },
                },
                {
                    producerIds: {
                        has: id,
                    },
                },
                {
                    writerIds: {
                        has: id,
                    },
                },
            ],
        },
    })
}
