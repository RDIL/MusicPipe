import { getToken, JWT } from "next-auth/jwt"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    PreviewData,
} from "next"
import { UserRole } from "./api-generated"
import { getPermissionsInt, PermissionsInt } from "./utils"
import { ParsedUrlQuery } from "querystring"

type WithPageAuthenticationOptions = {
    minimumRole?: UserRole
}

export interface AuthenticationProps {
    session: JWT | null
}

export type ModifiedGetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
> = (
    context: GetServerSidePropsContext<Q, D> & { token: JWT | null }
) => Promise<GetServerSidePropsResult<P>>

export function withPageAuthentication<PageProps>(
    options: WithPageAuthenticationOptions,
    // @ts-expect-error Next.js bad typing.
    getServerSideProps: ModifiedGetServerSideProps<PageProps>
): GetServerSideProps<PageProps & AuthenticationProps> {
    return async function innerGetServerSideProps(
        context: GetServerSidePropsContext
    ) {
        const token = await getToken({
            req: context.req,
            secret: authOptions.secret,
        })

        if (options.minimumRole) {
            if (!token) {
                return {
                    redirect: {
                        destination: "/api/auth/signin",
                        permanent: false,
                    },
                }
            }

            if (
                getPermissionsInt(token.role) <
                PermissionsInt[options.minimumRole]
            ) {
                return {
                    redirect: {
                        destination: "/unauthorized",
                        permanent: false,
                    },
                }
            }
        }

        const result: any = await getServerSideProps({
            ...context,
            token,
        })

        if (!result?.props) {
            return result
        }

        return {
            ...result,
            props: {
                ...result.props,
                session: token,
            },
        }
    }
}
