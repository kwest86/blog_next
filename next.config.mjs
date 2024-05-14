/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default nextConfig;
