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
import { User, UserRole } from "../api-generated"

export default function CreateUserDialog(props: {
    callback: (user: Partial<User>) => void
    cancel: () => void
}) {
    const [username, setUsername] = React.useState("")
    const [name, setName] = React.useState("")
    const [role, setRole] = React.useState<UserRole>(UserRole.ARTIST)

    return (
        <CreateDialog
            type="User"
            onCreate={() =>
                props.callback({
                    username,
                    name,
                    role,
                })
            }
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormControl>
                <FormLabel id="role-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                    aria-labelledby="role-radio-buttons-group-label"
                    defaultValue="artist"
                    name="role-radio-buttons-group"
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                >
                    <FormControlLabel
                        value={UserRole.ADMIN}
                        control={<Radio />}
                        label="Admin"
                    />
                    <FormControlLabel
                        value={UserRole.MANAGER}
                        control={<Radio />}
                        label="Manager"
                    />
                    <FormControlLabel
                        value={UserRole.VIEWER}
                        control={<Radio />}
                        label="Viewer"
                    />
                    <FormControlLabel
                        value={UserRole.ARTIST}
                        control={<Radio />}
                        label="Artist"
                    />
                </RadioGroup>
            </FormControl>
        </CreateDialog>
    )
}
