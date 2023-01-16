import React from "react"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import prismaInstance from "../../src/prisma"
import Head from "next/head"
import { CompleteSong, getCompleteSong } from "../../src/apiExtended"
import {
    formatSongTitleString,
    FormattedSongName,
} from "../../src/components/FormattedSongName"
import { FormattedArtistList } from "../../src/components/FormattedArtistList"
import { Button, styled } from "@mui/material"
import Edit from "@mui/icons-material/Edit"
import { SpacedEditableArtistList } from "../../src/components/EditableArtistList"

interface CommonProps {
    song: CompleteSong
}

function ReadView(props: CommonProps & EditableProvider) {
    return (
        <section>
            <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => props.setEditing(true)}
            >
                Edit
            </Button>

            <p>
                Primaries:{" "}
                <FormattedArtistList artists={props.song.primaryArtists} />
            </p>

            <p>
                Featured:{" "}
                <FormattedArtistList artists={props.song.featuredArtists} />
            </p>

            <p>
                Writers: <FormattedArtistList artists={props.song.writers} />
            </p>

            <p>
                Producers:{" "}
                <FormattedArtistList artists={props.song.producers} />
            </p>
        </section>
    )
}

const FlexColumnSection = styled("section")(() => ({
    display: "flex",
    flexDirection: "column",
}))

type EditableProvider = {
    setEditing: (editing: boolean) => void
}

function WriteView(props: CommonProps & EditableProvider) {
    return (
        <FlexColumnSection>
            <SpacedEditableArtistList title="Primary Artists" />
            <SpacedEditableArtistList title="Featured Artists" />
            <SpacedEditableArtistList title="Writers" />
            <SpacedEditableArtistList title="Producers" />
        </FlexColumnSection>
    )
}

export default function SongById(props: CommonProps) {
    const [isEditing, setIsEditing] = React.useState(false)

    return (
        <>
            <Head>
                <title>{formatSongTitleString({ song: props.song })}</title>
            </Head>

            <main>
                <h1>
                    <span>
                        <FormattedSongName song={props.song} />
                        {props.song.featuredArtists.length > 0 && (
                            <FormattedArtistList
                                artists={props.song.featuredArtists}
                            />
                        )}
                    </span>
                </h1>

                {isEditing ? (
                    <WriteView song={props.song} setEditing={setIsEditing} />
                ) : (
                    <ReadView song={props.song} setEditing={setIsEditing} />
                )}
            </main>
        </>
    )
}

export async function getServerSideProps(
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CommonProps>> {
    const params = context.params

    if (!params?.id) {
        return {
            notFound: true,
        }
    }

    const song = await prismaInstance.song.findFirst({
        where: {
            id: params.id,
        },
    })

    if (!song) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            song: await getCompleteSong(song),
        },
    }
}
