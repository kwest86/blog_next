export const runtime = "edge";

import dynamic from "next/dynamic";
import { transformMicroCMSResponse } from "../../../services/microcms";
import { fetchBlogPost as fetchWordPressBlogPost } from "../../../services/wordpress";
import { BlogContentsType } from "@/type";
import { APP_URL, CMS_SERVICE } from "@/environments";
import { Metadata } from "next";

const RenderPost = dynamic<{ blogContents: BlogContentsType }>(
  () =>
    import("@/components/molecules/RenderPost").then(
      (mod) =>
        mod.RenderPost as React.ComponentType<{
          blogContents: BlogContentsType;
        }>,
    ),
  {
    ssr: false,
  },
);

async function getPost({
  postId,
  draftKey,
}: {
  postId: string;
  draftKey?: string | undefined;
}): Promise<BlogContentsType | null> {
  try {
    switch (CMS_SERVICE) {
      case "microcms": {
        const response = await fetch(
          `${APP_URL}/api/microcms/post?id=${postId}${draftKey ? `&draftKey=${draftKey}` : ""}`,
          { method: "GET" },
        );
        const post = await response.json();
        return transformMicroCMSResponse(post);
      }
      case "wordpress": {
        return await fetchWordPressBlogPost(postId);
      }
      default:
        throw new Error(`Unsupported CMS service: ${CMS_SERVICE}`);
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
}

// FIXME: getPostが「meta情報の取得」と「コンテンツのレンダリング」の2回呼ばれているので改善すべき
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { postId: string };
  searchParams: { [key: string]: string | undefined };
}): Promise<Metadata | null> {
  const blogPost = await getPost({
    postId: params.postId,
    draftKey: searchParams.draftKey,
  });
  if (!blogPost) {
    return null;
  }
  return {
    title: `${blogPost.title}`,
    description: blogPost.description,
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      url: `${APP_URL}/api/ogp?image?title=${blogPost.title}`,
    },
    twitter: {
      title: blogPost.title,
      card: "summary_large_image",
      description: blogPost.description,
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { postId: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const blogPost = await getPost({
    postId: params.postId,
    draftKey: searchParams.draftKey,
  });
  if (!blogPost) return <div>Loading...</div>;
  return <RenderPost blogContents={blogPost} />;
}
