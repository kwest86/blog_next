export type CMSServiceType = "microcms" | "wordpress";

export type BlogTagsType = {
  id: string;
  name: string;
};

export type BlogContentsType = {
  id: string;
  createdAt: string;
  revisedAt: string;
  title: string;
  description: string;
  content: string;
  tags: BlogTagsType[];
  thumbnail: string;
};
