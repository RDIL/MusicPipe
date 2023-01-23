import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import React from "react"
import Reorder from "react-reorder"
import Menu from "@mui/icons-material/Menu"

export function ReorderableList() {
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
            <Reorder
                reorderId="my-list" // Unique ID that is used internally to track this list (required)
                reorderGroup="reorder-group"
                draggedClassName="dragged"
                touchHoldTime={500}
                mouseHoldTime={200}
                onReorder={(...data) => {
                    console.log("here", data)
                }} // Callback when an item is dropped (you will need this to update your state)
                placeholder={
                    <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element
                }
            >
                {[
                    <ListItem key={1}>
                        <ListItemIcon>
                            <Menu />
                        </ListItemIcon>
                        <ListItemText primary="F" />
                    </ListItem>,
                    <ListItem key={2}>
                        <ListItemIcon>
                            <Menu />
                        </ListItemIcon>
                        <ListItemText primary="E" />
                    </ListItem>,
                    <ListItem key={3}>
                        <ListItemIcon>
                            <Menu />
                        </ListItemIcon>
                        <ListItemText primary="D" />
                    </ListItem>,
                ]}
            </Reorder>
        </List>
    )
}
