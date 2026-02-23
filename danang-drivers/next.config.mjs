/** @type {import('next').NextConfig} */
const isExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  ...(isExport && {
    output: 'export',
    basePath: '/dn-ha-trips',
  }),
  images: {
    ...(isExport && { unoptimized: true }),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
