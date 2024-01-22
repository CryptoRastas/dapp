/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      'pino-pretty': false
    }
    return config
  },
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
