/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/submit',
        permanent: true, // Uses a 308 status code
      },
    ];
  },
};

export default nextConfig;
