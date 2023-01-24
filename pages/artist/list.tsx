import React from "react"
import Link from "next/link"
import Head from "next/head"
import { Artist, UserRole } from "../../src/api-generated"
import prismaInstance from "../../src/prisma"
import { LoadingState, usePageApi } from "../../src/components/hooks/usePageApi"
import dynamic from "next/dynamic"
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import { MarginBottomButton } from "../../src/components/MarginBottomButton"
import { withPageAuthentication } from "../../src/withAuthentication"
import { MarginTopPaper } from "../../src/components/MarginTopPaper"

interface ArtistListProps {
    artists: Artist[]
}

// noinspection JSUnusedGlobalSymbols
const LazyCreateArtistDialog = dynamic(
    () => import("../../src/components/CreateArtistDialog"),
    {
        loading: () => <CircularProgress disableShrink />,
        ssr: true,
    }
)

export default function ArtistList({ artists }: ArtistListProps) {
    const [creatingNew, setCreatingNew] = React.useState(false)
    const artistsApi = usePageApi("/api/artist")

    const createArtistCallback = (artist: Partial<Artist>) => {
        setCreatingNew(false)
        artistsApi.mutate(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(artist),
            },
            true
        )
    }

    return (
        <main>
            <Head>
                <title>Artist List</title>
            </Head>

            <h1>Artists</h1>

            {creatingNew ? (
                <LazyCreateArtistDialog
                    callback={createArtistCallback}
                    cancel={() => setCreatingNew(false)}
                />
            ) : null}

            <MarginBottomButton
                variant="outlined"
                onClick={() => setCreatingNew(true)}
            >
                Add New Artist
            </MarginBottomButton>

            {artistsApi.status === LoadingState.Loading ? (
                <CircularProgress disableShrink />
            ) : null}
            {artistsApi.alertBox}

            <TableContainer
                component={
                    artistsApi.status === LoadingState.Idle
                        ? Paper
                        : MarginTopPaper
                }
            >
                <Table sx={{ minWidth: 650 }} aria-label="artist list">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Aliases</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {artists.map((artist) => (
                            <TableRow
                                key={artist.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link href={`/artist/${artist.id}`}>
                                        {artist.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    {artist.aliases.length > 0
                                        ? artist.aliases.join(", ")
                                        : "None"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    )
}

export const getServerSideProps = withPageAuthentication<ArtistListProps>(
    {
        minimumRole: UserRole.MANAGER,
    },
    async () => ({
        props: {
            artists: await prismaInstance.artist.findMany({
                orderBy: {
                    name: "asc",
                },
                select: {
                    id: true,
                    name: true,
                    aliases: true,
                },
            }),
        },
    })
)
