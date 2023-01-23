import React from "react"
import { useDropzone } from "react-dropzone"

export function FileDropzone() {
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        console.log(acceptedFiles)
    }, [])

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
