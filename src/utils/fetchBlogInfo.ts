"use client";

const NEXT_PUBLIC_PROXY_WORKER_URL = process.env.NEXT_PUBLIC_PROXY_WORKER_URL;

export type LinkInfo = {
  title: string;
  description: string;
  image: string;
  favicon: string;
};

function getLinkHref(
  doc: Document,
  rel: string,
  baseUrl: string
): string | null {
  const element = doc.querySelector(`link[rel="${rel}"]`);
  if (element) {
    const href = element.getAttribute("href");
    if (href) {
      return new URL(href, baseUrl).toString();
    }
  }
  return null;
}

export async function fetchLinkInfo(url: string): Promise<LinkInfo> {
  // URLに基づいてキャッシュからデータを取得
  const cachedData = sessionStorage.getItem(url);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // キャッシュにデータがない場合は、リクエストを行う
  const response = await fetch(
    `${NEXT_PUBLIC_PROXY_WORKER_URL}?url=${encodeURIComponent(url)}`
  );
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const getMetaContent = (name: string): string | null => {
    const element = doc.querySelector(`meta[property="${name}"]`);
    return element ? element.getAttribute("content") : null;
  };

  const title = getMetaContent("og:title") || "";
  const description = getMetaContent("og:description") || "";
  const image = getMetaContent("og:image") || "";
  const favicon =
    getLinkHref(doc, "icon", url) ||
    getLinkHref(doc, "shortcut icon", url) ||
    "";

  // 取得したデータをキャッシュに保存
  const linkInfo = { title, description, image, favicon };
  sessionStorage.setItem(url, JSON.stringify(linkInfo));

  return linkInfo;
}
