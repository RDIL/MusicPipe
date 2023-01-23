import { UserRole } from "./api-generated"

/* NOTE: THESE UTILITIES MUST BE CLIENT SIDE COMPATIBLE! */

export function getPermissionsInt(userRole: string): number {
    return PermissionsInt[userRole as UserRoleString]
}

export const PermissionsInt: Record<UserRoleString, number> = {
    [UserRole.ARTIST]: 1,
    [UserRole.VIEWER]: 2,
    [UserRole.MANAGER]: 3,
    [UserRole.ADMIN]: 4,
}

export type UserRoleString = "ARTIST" | "VIEWER" | "MANAGER" | "ADMIN"
