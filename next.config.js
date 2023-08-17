/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true
    },
    images: {
        domains: ['cdn.weatherapi.com'],
        minimumCacheTTL: 60
    },
    swcMinify: true
}

module.exports = nextConfig
