import * as bcrypt from "bcrypt"
import prismaInstance from "./prisma"

export function hashPassword(password: string): Promise<string> {
    return bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt))
}

export function comparePassword(
    maybePassword: string,
    realPassword: string
): Promise<boolean> {
    return bcrypt.compare(maybePassword, realPassword)
}

export function createUser(username: string, password: string): Promise<void> {
    return hashPassword(password).then((hashedPassword) =>
        prismaInstance.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        })
    )
}
