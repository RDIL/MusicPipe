import { CreateDialog } from "./CreateDialog"
import React from "react"
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material"

export default function CreateUserDialog(props: {
    callback: () => void
    cancel: () => void
}) {
    return (
        <CreateDialog
            type="User"
            onCreate={() => props.callback()}
            open={true}
            onClose={() => props.cancel()}
        >
            <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username or Email Address"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
            />
            <FormControl>
                <FormLabel id="role-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                    aria-labelledby="role-radio-buttons-group-label"
                    defaultValue="artist"
                    name="radio-buttons-group"
                >
                    <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                    />
                    <FormControlLabel
                        value="manager"
                        control={<Radio />}
                        label="Manager"
                    />
                    <FormControlLabel
                        value="viewer"
                        control={<Radio />}
                        label="Viewer"
                    />
                    <FormControlLabel
                        value="artist"
                        control={<Radio />}
                        label="Artist"
                    />
                </RadioGroup>
            </FormControl>
        </CreateDialog>
    )
}
