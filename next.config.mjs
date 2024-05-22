/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  env: {
    NEXT_PUBLIC_APP_TITLE: process.env.NEXT_PUBLIC_APP_TITLE,
    NEXT_PUBLIC_APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CMS_DOMAIN: process.env.NEXT_PUBLIC_CMS_DOMAIN,
    NEXT_PUBLIC_CMS_API_KEY: process.env.NEXT_PUBLIC_CMS_API_KEY,
    NEXT_PUBLIC_PROXY_WORKER_URL: process.env.NEXT_PUBLIC_PROXY_WORKER_URL,
    NEXT_PUBLIC_WORDPRESS_BASE_ENDPOINT:
      process.env.NEXT_PUBLIC_WORDPRESS_BASE_ENDPOINT,
  },
};

export default nextConfig;
