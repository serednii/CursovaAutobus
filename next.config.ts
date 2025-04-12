import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Рекомендується увімкнути для кращої перевірки помилок
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/old-signin",
        destination: "/auth/signin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
