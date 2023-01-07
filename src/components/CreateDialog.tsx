import React from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material"

export interface CreateDialogProps {
    type: string
    open: boolean
    onClose: () => void
    onCreate: () => void
    children: React.ReactNode | React.ReactNode[]
}

export function CreateDialog(props: CreateDialogProps) {
    const { type, children, open, onClose, onCreate } = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create {type}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancel
                </Button>
                <Button onClick={onCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}
