/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    /// should allow only ['*', 'ipfs.io']
    remotePatterns: [
      {
        hostname: 'ipfs.io'
      },
      {
        hostname: 'localhost'
      }
    ]
  }
}

module.exports = nextConfig
