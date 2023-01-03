import type { NextApiRequest, NextApiResponse } from "next"
import { ApiSong, Song } from "../../src/entities"
import { BasicApiHandler } from "../../src/basicApiHandler"

const placeholderSong: Song = new Song()
placeholderSong.producers = []
placeholderSong.featuredArtists = []
placeholderSong.writers = []
placeholderSong.primaryArtists = []
placeholderSong.album = null
placeholderSong.title = "Placeholder Song"

const apiHandler = new BasicApiHandler<ApiSong | string, Song>(
    Song,
    Song.keys,
    // @ts-expect-error Temporary
    null
)

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiSong | string>
) {
    apiHandler.dispatch(req, res)
}
