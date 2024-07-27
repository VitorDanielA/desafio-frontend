/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/ps/metahumans',
        destination: 'http://homologacao3.azapfy.com.br/api/ps/metahumans',
      },
    ];
  },
  images: {
    domains: ['cdn.jsdelivr.net'],
  },
};

export default nextConfig;
