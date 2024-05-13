import { createClient } from "microcms-js-sdk";
import { CMS_DOMAIN, CMS_API_KEY } from "../environments";

export const client = createClient({
  serviceDomain: CMS_DOMAIN,
  apiKey: CMS_API_KEY,
});
