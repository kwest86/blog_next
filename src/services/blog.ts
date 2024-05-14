import { BlogContentsType, BlogTagsType } from "../type";
import {
  fetchBlogTags as fetchMicroCMSBlogTags,
  fetchBlogPosts as fetchMicroCMSBlogPosts,
} from "./microcms";
import {
  fetchBlogTags as fetchWordpressBlogTags,
  fetchBlogPosts as fetchWordpressBlogPosts,
} from "./wordpress";

const CMS_SERVICE = process.env.CMS_SERVICE;

export const fetchBlogTags = async (): Promise<BlogTagsType[]> => {
  if (CMS_SERVICE === "microcms") {
    return fetchMicroCMSBlogTags();
  } else if (CMS_SERVICE === "wordpress") {
    return fetchWordpressBlogTags();
  } else {
    // 他のCMSサービスからタグを取得するロジックをここに追加
    throw new Error("Unsupported CMS service");
  }
};

export const fetchBlogPosts = async (
  selectedTag?: string
): Promise<BlogContentsType[]> => {
  if (CMS_SERVICE === "microcms") {
    return fetchMicroCMSBlogPosts(selectedTag);
  } else if (CMS_SERVICE === "wordpress") {
    return fetchWordpressBlogPosts(selectedTag);
  } else {
    // 他のCMSサービスから記事を取得するロジックをここに追加
    throw new Error("Unsupported CMS service");
  }
};
