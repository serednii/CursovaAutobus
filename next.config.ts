import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["avatars.githubusercontent.com"], // Дозволяємо зображення з цього домену
  },
};

export default nextConfig;
