import { UserRole } from "./api-generated"

/* NOTE: THESE UTILITIES MUST BE CLIENT SIDE COMPATIBLE! */

export const PermissionsInt: Record<keyof typeof UserRole, number> = {
    [UserRole.ARTIST]: 1,
    [UserRole.VIEWER]: 2,
    [UserRole.MANAGER]: 3,
    [UserRole.ADMIN]: 4,
}
