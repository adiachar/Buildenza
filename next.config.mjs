import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "**" }
        ]
    },
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "prisma"],
    },
}

// Allow Cloudflare bindings during local dev
if (process.env.NODE_ENV === "development") {
    await setupDevPlatform()
}

export default nextConfig
