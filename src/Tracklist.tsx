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
import { ApiSong } from "./entities"
import { FormattedSongName } from "./FormattedSongName"

export interface TracklistProps {
    tracks: ApiSong[]
}

export function Tracklist({ tracks }: TracklistProps) {
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
                    {tracks.map((track) => (
                        <TableRow
                            key={track.title}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <FormattedSongName song={track} />
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
