/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "assets.hyperteknoloji.com",
          },
        ],
      },
};

export default nextConfig;
