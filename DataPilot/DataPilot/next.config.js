/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/',
        permanent: false,
      },
    ]
  },
  // Bundle optimization
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Reduce bundle size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Reduce client bundle size
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

// Only use bundle analyzer in development or when explicitly enabled
if (process.env.ANALYZE === 'true') {
  try {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    })
    nextConfig = withBundleAnalyzer(nextConfig)
  } catch (error) {
    console.warn('Bundle analyzer not available:', error.message)
  }
}

module.exports = nextConfig