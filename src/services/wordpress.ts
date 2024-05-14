import axios from "axios";
import { BlogContentsType, BlogTagsType } from "../type";
import { WORDPRESS_BASE_ENDPOINT } from "../environments";

type WordPressPost = {
  id: number;
  date: string;
  modified: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  categories: number[];
  featured_media: number;
};

type WordPressCategory = {
  id: number;
  name: string;
};

type WordPressFeaturedMedia = {
  source_url: string;
};

const transformWordPressResponse = (
  post: WordPressPost,
  categories: WordPressCategory[],
  featuredMedia: WordPressFeaturedMedia | null
): BlogContentsType => {
  return {
    id: post.id.toString(),
    createdAt: post.date,
    revisedAt: post.modified,
    title: post.title.rendered,
    description: post.excerpt.rendered,
    content: post.content.rendered,
    tags: categories.map((category) => ({
      id: category.id.toString(),
      name: category.name,
    })),
    thumbnail: featuredMedia?.source_url || "",
  };
};

export const fetchBlogPost = async (
  id: string
): Promise<BlogContentsType | null> => {
  try {
    const response = await axios.get<WordPressPost>(
      `${WORDPRESS_BASE_ENDPOINT}/posts/${id}`
    );
    console.log(response);
    const post = response.data;

    const categoriesResponse = await axios.get<WordPressCategory[]>(
      `${WORDPRESS_BASE_ENDPOINT}/categories?post=${id}`
    );
    const categories = categoriesResponse.data;

    let featuredMedia: WordPressFeaturedMedia | null = null;
    if (post.featured_media) {
      const featuredMediaResponse = await axios.get<WordPressFeaturedMedia>(
        `${WORDPRESS_BASE_ENDPOINT}/media/${post.featured_media}`
      );
      featuredMedia = featuredMediaResponse.data;
    }

    return transformWordPressResponse(post, categories, featuredMedia);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
};

export const fetchBlogPosts = async (
  selectedTag?: string
): Promise<BlogContentsType[]> => {
  try {
    const queryParams = selectedTag ? `?categories=${selectedTag}` : "";
    const response = await axios.get<WordPressPost[]>(
      `${WORDPRESS_BASE_ENDPOINT}/posts${queryParams}`
    );
    console.log(response);
    const posts = response.data;

    const blogContents: BlogContentsType[] = await Promise.all(
      posts.map(async (post) => {
        const categoriesResponse = await axios.get<WordPressCategory[]>(
          `${WORDPRESS_BASE_ENDPOINT}/categories?post=${post.id}`
        );
        const categories = categoriesResponse.data;

        let featuredMedia: WordPressFeaturedMedia | null = null;
        if (post.featured_media) {
          const featuredMediaResponse = await axios.get<WordPressFeaturedMedia>(
            `${WORDPRESS_BASE_ENDPOINT}/media/${post.featured_media}`
          );
          featuredMedia = featuredMediaResponse.data;
        }

        return transformWordPressResponse(post, categories, featuredMedia);
      })
    );

    return blogContents;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

export const fetchBlogTags = async (): Promise<BlogTagsType[]> => {
  try {
    const response = await axios.get<WordPressCategory[]>(
      `${WORDPRESS_BASE_ENDPOINT}/categories`
    );
    const categories = response.data;

    return categories.map((category) => ({
      id: category.id.toString(),
      name: category.name,
    }));
  } catch (error) {
    console.error("Error fetching blog tags:", error);
    return [];
  }
};
