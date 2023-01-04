import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import React from "react"
import { FormattedSongName } from "./FormattedSongName"
import { Artist, Song } from "./api-generated"

export interface TracklistProps {
    tracks: Song[]
    trackFeats: Artist[][]
}

export function Tracklist({ tracks, trackFeats }: TracklistProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tracks</TableCell>
                        <TableCell align="right">Primary Artist(s)</TableCell>
                        <TableCell align="right">Placeholder Field 1</TableCell>
                        <TableCell align="right">Placeholder Field 2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tracks.map((track, index) => (
                        <TableRow
                            key={track.title}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <FormattedSongName
                                    song={track}
                                    featuredArtists={trackFeats[index]}
                                />
                            </TableCell>
                            <TableCell align="right">{track.title}</TableCell>
                            <TableCell align="right">{track.title}</TableCell>
                            <TableCell align="right">{track.title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
