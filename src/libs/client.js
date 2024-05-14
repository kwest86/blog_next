import { createClient } from "microcms-js-sdk";
import { CMS_DOMAIN, CMS_API_KEY } from "@/environments";

if (!CMS_DOMAIN || !CMS_API_KEY) {
  throw new Error(
    "Missing MicroCMS configuration. Check environment variables."
  );
}

export const client = createClient({
  serviceDomain: CMS_DOMAIN,
  apiKey: CMS_API_KEY,
});
