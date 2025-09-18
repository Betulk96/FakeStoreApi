const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fakestoreapi.com'],
  },
  experimental: {
    esmExternals: 'loose'
  }
};

module.exports = withNextIntl(nextConfig);