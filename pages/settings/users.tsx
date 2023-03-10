import React from "react"
import prismaInstance from "../../src/prisma"
import { User, UserRole } from "../../src/api-generated"
import {
    CircularProgress,
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
import Head from "next/head"
import dynamic from "next/dynamic"
import { LoadingState, usePageApi } from "../../src/components/hooks/usePageApi"
import { withPageAuthentication } from "../../src/withAuthentication"
import { MarginBottomButton } from "../../src/components/MarginBottomButton"

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

// noinspection JSUnusedGlobalSymbols
const LazyCreateUserDialog = dynamic(
    () => import("../../src/components/CreateUserDialog"),
    {
        loading: () => <CircularProgress disableShrink />,
        ssr: true,
    }
)

function UserAdminActions({
    user,
    deleteUser,
}: {
    user: User
    deleteUser: React.DispatchWithoutAction
}) {
    const roles: [Lowercase<keyof typeof UserRole>, keyof typeof UserRole][] = [
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
            <MenuItem onClick={deleteUser}>
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
    const [creatingNew, setCreatingNew] = React.useState(false)
    const usersApi = usePageApi("/api/user")

    const handleClick =
        (userId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget)
            setCurrentOpenUser(userId)
        }

    const handleClose = () => {
        setAnchorEl(null)
        setCurrentOpenUser(null)
    }

    const createUserCallback = (user: Partial<User>) => {
        setCreatingNew(false)
        usersApi.mutate(
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            },
            true
        )
    }

    const deleteUserCallback = (userId: string) => {
        usersApi.mutate(
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: userId }),
            },
            true
        )
    }

    // const updateUserCallback = (user: Partial<User>) => {
    //     usersApi.mutate(
    //         {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(user),
    //         },
    //         true
    //     )
    // }

    return (
        <main>
            <Head>
                <title>User Management</title>
            </Head>

            <h1>User Management</h1>

            {creatingNew ? (
                <LazyCreateUserDialog
                    callback={createUserCallback}
                    cancel={() => setCreatingNew(false)}
                />
            ) : null}

            <MarginBottomButton
                variant="outlined"
                onClick={() => setCreatingNew(true)}
            >
                Add New User
            </MarginBottomButton>

            {usersApi.status === LoadingState.Loading ? (
                <CircularProgress disableShrink />
            ) : null}
            {usersApi.alertBox}

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
                                    id={"button-admin-actions-" + user.id}
                                    endIcon={<ArrowDropDown />}
                                    aria-controls={
                                        currentOpenUser === user.id
                                            ? `admin-actions-` + user.id
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
                                    id={"admin-actions-" + user.id}
                                    anchorEl={anchorEl}
                                    open={currentOpenUser === user.id}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": `admin-actions-${user.id}`,
                                    }}
                                >
                                    <UserAdminActions
                                        deleteUser={() =>
                                            deleteUserCallback(user.id)
                                        }
                                        user={user}
                                    />
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    )
}

export const getServerSideProps = withPageAuthentication(
    { minimumRole: UserRole.ADMIN },
    async () => {
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
)
