/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ['*', 'ipfs.io']
  }
}

module.exports = nextConfig
