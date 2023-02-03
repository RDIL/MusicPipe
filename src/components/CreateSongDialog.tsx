import { CreateDialog } from "./CreateDialog"
import React from "react"
import { TextField } from "@mui/material"
import { Song } from "../api-generated"
import { FileDropzone } from "./FileDropzone"

const audioFormats = [
    "audio/mpeg",
    "audio/basic",
    "audioo/L24",
    "audio/mp4",
    "audio/mpeg",
    "audio/ogg",
    "audio/vorbis",
]

export default function CreateSongDialog(props: {
    callback: (song: Partial<Song>, binary: string, mime: string) => void
    cancel: () => void
}) {
    const [title, setTitle] = React.useState("")
    const [binary, setBinary] = React.useState("")
    const [mime, setMime] = React.useState(-2)

    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        const goodMime = audioFormats.indexOf(acceptedFiles[0].type) != -1
        setMime(audioFormats.indexOf(acceptedFiles[0].type))
        console.log(goodMime)
        if (goodMime) {
            let reader = new FileReader()
            reader.readAsBinaryString(acceptedFiles[0])

            reader.onloadend = (e: any) => {
                let binary = e.target.result
                setBinary(binary)
            }
        }
    }, [])

    return (
        <CreateDialog
            type="Song"
            onCreate={() => {
                console.log(mime)
                if (mime <= -1) {
                    props.cancel()
                    alert("Invalid file format")
                    return
                }

                return props.callback(
                    {
                        title,
                    },
                    binary,
                    audioFormats[mime]
                )
            }}
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

            <FileDropzone onDrop={onDrop} />
        </CreateDialog>
    )
}
