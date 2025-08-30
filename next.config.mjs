/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

export default {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: isProd ? '/VicLu96' : '',
  assetPrefix: isProd ? '/landing_page_cyclowatt/' : '',
};
