import { CMSServiceType } from "./type";

export const APP_TITLE = process.env.NEXT_PUBLIC_CMS_DOMAIN;
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const CMS_SERVICE: CMSServiceType = "microcms";
export const CMS_DOMAIN = process.env.NEXT_PUBLIC_CMS_DOMAIN;
export const CMS_API_KEY = process.env.NEXT_PUBLIC_CMS_API_KEY;
export const PROXY_WORKER_URL = process.env.NEXT_PUBLIC_PROXY_WORKER_URL;
export const WORDPRESS_BASE_ENDPOINT =
  process.env.NEXT_PUBLIC_WORDPRESS_BASE_ENDPOINT;
