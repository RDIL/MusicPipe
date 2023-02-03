import { CreateDialog } from "./CreateDialog"
import React from "react"
import { TextField } from "@mui/material"
import { Song } from "../api-generated"
import { FileDropzone } from "./FileDropzone"

export default function CreateSongDialog(props: {
    callback: (song: Partial<Song>) => void
    cancel: () => void
}) {
    const [title, setTitle] = React.useState("")

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles[0])

        var reader = new FileReader();
        // var fileByteArray: number[] = [];
        reader.readAsBinaryString(acceptedFiles[0]);

        reader.onloadend = (evt: any) => {
            var binary = evt.target.result;
            console.log(binary);
        }

    }, [])

    return (
        <CreateDialog
            type="Song"
            onCreate={() =>
                props.callback({
                    title,
                })
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
