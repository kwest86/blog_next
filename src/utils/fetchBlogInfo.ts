import { APP_URL } from "@/environments";

export type LinkInfo = {
  title: string;
  description: string;
  image: string;
  favicon: string;
};

export async function fetchLinkInfo(url: string): Promise<LinkInfo> {
  // URLに基づいてキャッシュからデータを取得
  const cachedData = sessionStorage.getItem(url);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  // キャッシュにデータがない場合は、リクエストを行う
  const response = await fetch(`${APP_URL}/api/ogp?url=${encodeURIComponent(url)}`);
  const data = await response.json();
  const {
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    favicon: favicon,
  } = data;

  // 取得したデータをキャッシュに保存
  const linkInfo = { title, description, image, favicon };
  sessionStorage.setItem(url, JSON.stringify(linkInfo));

  return linkInfo;
}
