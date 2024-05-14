import { createClient } from "microcms-js-sdk";

// サーバーサイドとクライアントサイドの両方で使用される環境変数を読み込む
const CMS_DOMAIN =
  typeof window === "undefined"
    ? process.env.CMS_DOMAIN
    : process.env.NEXT_PUBLIC_CMS_DOMAIN;
const CMS_API_KEY =
  typeof window === "undefined"
    ? process.env.CMS_API_KEY
    : process.env.NEXT_PUBLIC_CMS_API_KEY;

if (!CMS_DOMAIN || !CMS_API_KEY) {
  throw new Error(
    "Missing MicroCMS configuration. Check environment variables."
  );
}

export const client = createClient({
  serviceDomain: CMS_DOMAIN,
  apiKey: CMS_API_KEY,
});
