import * as React from "react"
import { GetServerSidePropsContext } from "next"
import prismaInstance from "../../src/prisma"
import { User, UserRole } from "../../src/api-generated"
import {
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material"
import ArrowDropDown from "@mui/icons-material/ArrowDropDown"
import DeleteForever from "@mui/icons-material/DeleteForever"
import MoveDown from "@mui/icons-material/MoveDown"
import MoveUp from "@mui/icons-material/MoveUp"
import { InlineButton } from "../../src/components/InlineButton"
import { PermissionsInt } from "../../src/utils"

interface UserManagementProps {
    users: User[]
}

type PermissionDetails = [React.ReactElement | null, string] | null

function detailsForPermission(
    userPermission: UserRole,
    permission: UserRole
): PermissionDetails {
    const uPerm = PermissionsInt[userPermission]
    const target = PermissionsInt[permission]

    const isExactly = uPerm === target
    const isHigher = uPerm > target

    if (isExactly) {
        return null
    }

    if (isHigher) {
        return [<MoveDown key={permission} />, "Demote to "]
    }

    return [<MoveUp key={permission} />, "Promote to "]
}

function UserAdminActions({ user }: { user: User }) {
    const roles: [string, keyof typeof UserRole][] = [
        ["admin", "ADMIN"],
        ["manager", "MANAGER"],
        ["viewer", "VIEWER"],
        ["artist", "ARTIST"],
    ]

    return (
        <MenuList dense>
            <MenuItem>
                <ListItemText inset>Reset Password</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <DeleteForever />
                </ListItemIcon>
                Delete
            </MenuItem>
            <Divider />
            {roles.map(([role, permission]) => {
                const details = detailsForPermission(user.role, permission)

                if (!details) {
                    return (
                        <MenuItem disabled key={role}>
                            <ListItemText inset>Already {role}</ListItemText>
                        </MenuItem>
                    )
                }

                return (
                    <MenuItem key={role}>
                        <ListItemIcon>{details[0]}</ListItemIcon>
                        {details?.[1]}
                        {role}
                    </MenuItem>
                )
            })}
        </MenuList>
    )
}

export default function UserManagement({ users }: UserManagementProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [currentOpenUser, setCurrentOpenUser] = React.useState<string | null>(
        null
    )

    const handleClick =
        (userId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget)
            setCurrentOpenUser(userId)
        }

    const handleClose = () => {
        setAnchorEl(null)
        setCurrentOpenUser(null)
    }

    return (
        <div>
            <h1>User Management</h1>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Admin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>
                                <InlineButton
                                    id={"button-user-admin-actions-" + user.id}
                                    endIcon={<ArrowDropDown />}
                                    aria-controls={
                                        currentOpenUser === user.id
                                            ? `user-admin-actions-` + user.id
                                            : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={
                                        currentOpenUser === user.id
                                            ? "true"
                                            : undefined
                                    }
                                    onClick={handleClick(user.id)}
                                >
                                    Actions
                                </InlineButton>
                                <Menu
                                    style={{
                                        display: "flex",
                                    }}
                                    id={"user-admin-actions-" + user.id}
                                    anchorEl={anchorEl}
                                    open={currentOpenUser === user.id}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": `user-admin-actions-${user.id}`,
                                    }}
                                >
                                    <UserAdminActions user={user} />
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const users = await prismaInstance.user.findMany({
        select: {
            id: true,
            name: true,
            username: true,
            role: true,
        },
    })

    return {
        props: {
            users,
        },
    }
}
