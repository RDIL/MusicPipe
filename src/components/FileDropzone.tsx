import React from "react"
import { useDropzone } from "react-dropzone"

interface FileDropzoneProps {
    onDrop: React.Dispatch<File[]>
}

export function FileDropzone(props: FileDropzoneProps) {
    const { onDrop } = props

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag and drop some files here, or click to select files</p>
            )}
        </div>
    )
}
