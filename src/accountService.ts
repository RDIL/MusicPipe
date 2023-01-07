import * as bcrypt from "bcrypt"
import prismaInstance from "./prisma"
import { UserRole } from "./api-generated"

export function hashPassword(password: string): Promise<string> {
    return bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt))
}

export function comparePassword(
    maybePassword: string,
    realPassword: string
): Promise<boolean> {
    return bcrypt.compare(maybePassword, realPassword)
}

export function createUser(
    name: string,
    username: string,
    password: string,
    role: UserRole
): Promise<void> {
    return hashPassword(password).then((hashedPassword) =>
        prismaInstance.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
                role,
            },
        })
    )
}
