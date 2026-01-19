/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cache-Konfiguration für Header
  // Wichtig: Verhindert Caching von API-Routen und dynamischen Inhalten
  async headers() {
    return [
      {
        // Verhindert Caching von API-Routen (inkl. Video-URLs)
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

