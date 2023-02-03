import { CreateDialog } from "./CreateDialog"
import React from "react"
import { TextField } from "@mui/material"
import { Song } from "../api-generated"
import { FileDropzone } from "./FileDropzone"
import { LoadingState, usePageApi } from "../../src/components/hooks/usePageApi"

export default function CreateSongDialog(props: {
    callback: (song: Partial<Song>, binary: string) => void
    cancel: () => void
}) {
    const [title, setTitle] = React.useState("");
    const [binary, setBinary] = React.useState("");

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles[0])


        let reader = new FileReader();
        reader.readAsBinaryString(acceptedFiles[0]);

        reader.onloadend = (e: any) => {
            let binary = e.target.result;
            setBinary(binary);
        }

    }, [])

    return (
        <CreateDialog
            type="Song"
            onCreate={() =>
                props.callback({
                    title
                }, binary)
            }
            open={true}
            onClose={() => props.cancel()}
        >
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Song Name"
                type="text"
                fullWidth
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <FileDropzone onDrop={onDrop}/>
        </CreateDialog>
    )
}
