import React from "react"
import { Autocomplete, Paper, styled, TextField } from "@mui/material"
import { ArtistProvider } from "../../pages/song/[id]"

interface ChipData {
    key: string
    label: string
}

const HalfStanding = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
}))

const SpacedAutoComplete = styled(
    Autocomplete as typeof Autocomplete<ChipData, true, true, true>
)(({ theme }) => ({
    padding: theme.spacing(2),
}))

function ArtistAutoComplete({
    artists,
    title,
}: {
    artists: readonly ChipData[]
} & EditableArtistListProps) {
    const [artistIds, setArtistIds] = React.useState<(string | null)[]>([])
    const [inputValue, setInputValue] = React.useState("")

    // React.useEffect(() => {
    //     console.log(artistIds)
    // }, [artistIds])

    return (
        <SpacedAutoComplete
            multiple
            freeSolo
            disableCloseOnSelect
            options={artists}
            disableListWrap
            getOptionLabel={(option: string | ChipData) =>
                typeof option === "string"
                    ? option
                    : option?.label ?? "Unknown Artist"
            }
            defaultValue={[]}
            filterSelectedOptions
            value={artistIds.map((id) => artists.find((a) => a.key === id)!)}
            onChange={(event: any, newValue) => {
                setArtistIds(
                    newValue.map(
                        (artist) => (artist as ChipData | null)?.key || null
                    )
                )
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={title}
                    placeholder="Artist's Name"
                />
            )}
        />
    )
}

export interface EditableArtistListProps {
    title: string
}

export function EditableArtistList(
    props: EditableArtistListProps & ArtistProvider
) {
    return (
        <HalfStanding {...props}>
            <Paper>
                <ArtistAutoComplete
                    artists={props.allArtists.map((a) => ({
                        key: a.id,
                        label: a.name,
                    }))}
                    title={props.title}
                />
            </Paper>
        </HalfStanding>
    )
}

export const SpacedEditableArtistList = styled(EditableArtistList)(
    ({ theme }) => ({
        marginTop: theme.spacing(2),
    })
)
