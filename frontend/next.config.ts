import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },

  // Web3 optimizations - Fix Node.js modules in browser
  webpack: config => {
    // Fallback for Node.js modules that don't exist in browser
    config.resolve.fallback = {
      fs: false, // File system
      net: false, // Network modules
      tls: false, // TLS/SSL
      crypto: false, // Crypto modules
      stream: false, // Node streams
      url: false, // URL parsing
      zlib: false, // Compression
      http: false, // HTTP client
      https: false, // HTTPS client
      assert: false, // Assert module
      os: false, // Operating system
      path: false, // File paths
    };

    // Exclude server-side libraries from bundle
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },

  // Prevent SSR for Web3 components
  transpilePackages: ['@wagmi/core', '@wagmi/connectors', 'wagmi'],

  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
