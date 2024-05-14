/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  env: {
    CMS_SERVICE: "microcms",
    APP_URL: process.env.APP_URL,
    CMS_DOMAIN: process.env.CMS_DOMAIN,
    CMS_API_KEY: process.env.CMS_API_KEY,
    NEXT_PUBLIC_CMS_SERVICE: "microcms",
    NEXT_PUBLIC_CMS_DOMAIN: process.env.NEXT_PUBLIC_CMS_DOMAIN,
    NEXT_PUBLIC_CMS_API_KEY: process.env.NEXT_PUBLIC_CMS_API_KEY,
    PROXY_WORKER_URL: process.env.PROXY_WORKER_URL,
    WORDPRESS_BASE_ENDPOINT: process.env.WORDPRESS_BASE_ENDPOINT,
    NEXT_PUBLIC_PROXY_WORKER_URL: process.env.NEXT_PUBLIC_PROXY_WORKER_URL,
    NEXT_PUBLIC_WORDPRESS_BASE_ENDPOINT:
      process.env.NEXT_PUBLIC_WORDPRESS_BASE_ENDPOINT,
  },
};

export default nextConfig;
