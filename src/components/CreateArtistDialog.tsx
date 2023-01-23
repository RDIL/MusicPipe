import { CreateDialog } from "./CreateDialog"
import React from "react"
import { TextField } from "@mui/material"
import { Artist } from "../api-generated"

export default function CreateArtistDialog(props: {
    callback: (artist: Partial<Artist>) => void
    cancel: () => void
}) {
    const [name, setName] = React.useState("")

    return (
        <CreateDialog
            type="Artist"
            onCreate={() =>
                props.callback({
                    name,
                })
            }
            open={true}
            onClose={() => props.cancel()}
        >
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Artist Name"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </CreateDialog>
    )
}
