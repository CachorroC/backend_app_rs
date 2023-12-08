/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env   : {
    cientId     : 'dac874230dcfcd71de02b41f5e78083c.access',
    clientSecret: 'cd9f43a4ea535037f9a1d03fc82e2477020438e462bb076d7926c53ebbadeaf8'
  },
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
