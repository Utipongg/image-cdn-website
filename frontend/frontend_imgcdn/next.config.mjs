/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.utipong.info',
          pathname: '/**',
        },
      ],
    },
};

export default nextConfig;
