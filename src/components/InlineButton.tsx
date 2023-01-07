import { Button, ButtonProps } from "@mui/material"
import React from "react"

export function InlineButton(props: ButtonProps) {
    return <Button disableRipple style={{ padding: 0 }} {...props} />
}
