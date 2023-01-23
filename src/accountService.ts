import * as bcrypt from "bcrypt"

export function hashPassword(password: string): Promise<string> {
    return bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt))
}

export function comparePassword(
    maybePassword: string,
    realPassword: string
): Promise<boolean> {
    return bcrypt.compare(maybePassword, realPassword)
}
