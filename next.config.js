/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/PortfolioV1',
  assetPrefix: '/PortfolioV1/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 