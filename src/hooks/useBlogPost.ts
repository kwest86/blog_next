import { useState, useEffect } from "react";
import { HeadingType } from "../components/atoms/TableContentHeader";
import { BlogContentsType } from "../type";
import { getHeadings } from "../utils/getHeadings";
import { fetchBlogPost as fetchMicroCMSBlogPost } from "../services/microcms";
import { fetchBlogPost as fetchWordPressBlogPost } from "../services/wordpress";

const CMS_SERVICE = process.env.CMS_SERVICE;

export const useBlogPost = (
  id: string | undefined,
  draftKey: string | null
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headings, setHeadings] = useState<HeadingType[]>([]);
  const [blogContents, setBlogContents] = useState<BlogContentsType>();

  useEffect(() => {
    if (!id) return;

    const fetchBlogPost = async () => {
      switch (CMS_SERVICE) {
        case "microcms":
          return fetchMicroCMSBlogPost(id, draftKey);
        case "wordpress":
          return fetchWordPressBlogPost(id);
        default:
          throw new Error(`Unsupported CMS service: ${CMS_SERVICE}`);
      }
    };

    fetchBlogPost()
      .then((blogContents) => {
        setError(null);
        setIsLoading(false);
        if (blogContents) {
          const tempHeadings = getHeadings(blogContents.content);
          setHeadings(tempHeadings);
          setBlogContents(blogContents);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
      });
  }, [id, draftKey]);

  return { isLoading, blogContents, error, headings };
};
