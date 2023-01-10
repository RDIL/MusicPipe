/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    redirects: async () => {
        return [
            {
                source: "/albums/:path",
                destination: "/album/:path",
                permanent: true,
            },
            {
                source: "/artists/:path",
                destination: "/artist/:path",
                permanent: true,
            },
            {
                source: "/songs/:path",
                destination: "/song/:path",
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
