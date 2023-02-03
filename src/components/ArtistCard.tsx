import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Artist } from "../api-generated"

export interface ArtistCardProps {
    artist: Artist
}

export function ArtistCard({ artist }: ArtistCardProps) {
    return (
        <Card sx={{ display: "flex", width: "20%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                        {artist.name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                    >
                        {artist.aliases.length > 0 ? (
                            <span>A.K.A.: {artist.aliases.join(", ")}</span>
                        ) : (
                            "Artist"
                        )}
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://via.placeholder.com/150"
                alt="Artist cover photo"
            />
        </Card>
    )
}
