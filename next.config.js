/** @type {import('next').NextConfig} */
const nextConfig = {
  output      : 'standalone',
  experimental: {
    typedRoutes                     : true,
    caseSensitiveRoutes             : true,
    serverComponentsExternalPackages: [
      'mongodb',
      'eslint',
      'prisma'
    ],
  },
};

module.exports = nextConfig;
