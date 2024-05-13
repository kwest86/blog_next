import { BlogContentsType, BlogTagsType } from "../type";

type MicroCmsImageType = {
  url: string;
};

type MicroCmsTagsType = {
  createdAt: string;
  revisedAt: string;
  id: string;
  name: string;
};

type MicroCmsContentWithHtmlType = {
  [key: number]: {
    richEditor?: string;
    html?: string;
  };
};

export type MicroCMSResponseType = {
  id: string;
  createdAt: string;
  revisedAt: string;
  title: string;
  description: string;
  content: string;
  content_with_html?: MicroCmsContentWithHtmlType;
  tags: MicroCmsTagsType[];
  thumbnail: MicroCmsImageType;
};

export const transformMicroCMSResponse = (
  response: MicroCMSResponseType
): BlogContentsType => {
  let content = response.content;
  if (response.content_with_html) {
    const contentWithHtml = Object.values(response.content_with_html)
      .map((item) => (item.richEditor || "") + (item.html || ""))
      .join("");
    content = response.content + contentWithHtml;
  }
  return {
    id: response.id,
    createdAt: response.createdAt,
    revisedAt: response.revisedAt,
    title: response.title,
    description: response.description,
    content: content,
    tags: response.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
    thumbnail: response.thumbnail?.url,
  };
};

export async function fetchBlogPost(
  id: string | undefined,
  draftKey?: string | null
): Promise<BlogContentsType | null> {
  if (!id) {
    throw new Error("");
  }
  try {
    const response = await fetch(
      `/api/microcms/post?id=${id}${draftKey ? `&draftKey=${draftKey}` : ""}`,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error(`Fetch Post Error! status: ${response.status}`);
    }
    const post = await response.json();
    return transformMicroCMSResponse(post);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function fetchBlogPosts(
  selectedTag?: string
): Promise<BlogContentsType[]> {
  try {
    const response = await fetch(
      `/api/microcms/posts${selectedTag ? `?tag=${selectedTag}` : ""}`,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error(`Fetch Posts Error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts.map((item: MicroCMSResponseType) =>
      transformMicroCMSResponse(item)
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export const fetchBlogTags = async (): Promise<BlogTagsType[]> => {
  try {
    const response = await fetch("/api/microcms/tags", { method: "GET" });
    if (!response.ok) {
      throw new Error(`Fetch Tags Error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
