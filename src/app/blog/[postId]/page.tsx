import { transformMicroCMSResponse } from "../../../services/microcms";
import { fetchBlogPost as fetchWordPressBlogPost } from "../../../services/wordpress";
import { BlogContentsType } from "@/type";
import { CMS_SERVICE } from "@/environments";
import { headers } from "next/headers";
import { RenderPost } from "@/components/molecules/RenderPost";

async function getPost({
  postId,
  draftKey,
}: {
  postId: string;
  draftKey?: string | undefined;
}): Promise<BlogContentsType | null> {
  const host = headers().get("host");
  try {
    switch (CMS_SERVICE) {
      case "microcms": {
        const response = await fetch(
          `http://${host}/api/microcms/post?id=${postId}${draftKey ? `&draftKey=${draftKey}` : ""}`,
          { method: "GET" }
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
