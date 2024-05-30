import { ReactElement, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { BlogContentsType, BlogTagsType } from "../../type";
import { BlogCard } from "../atoms/BlogCard";
import { TagSelect } from "../atoms/TagSelect";
import { fetchBlogPosts, fetchBlogTags } from "../../services/blog";

interface ArchiveProps {
  tag?: string;
}

export function Archive({ tag }: ArchiveProps): ReactElement {
  const [selectedTag, setSelectedTag] = useState<string>(tag || "");
  const [tags, setTags] = useState<BlogTagsType[]>([]);
  const [posts, setPosts] = useState<BlogContentsType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogTags()
      .then((tags) => {
        setTags(tags);
      })
      .catch((err) => {
        console.error("Error fetching tags:", err);
      });
  }, []);

  useEffect(() => {
    fetchBlogPosts(selectedTag)
      .then((posts) => {
        setPosts(posts);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
      });
  }, [selectedTag]);

  useEffect(() => {
    if (tag && tags.length > 0) {
      const matchedTag = tags.find((t) => t.id === tag);
      if (matchedTag) {
        setSelectedTag(matchedTag.id);
      }
    }
  }, [tag, tags]);

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  const options = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <Flex direction="column" paddingTop={2}>
      <TagSelect
        options={options}
        selectedValue={selectedTag}
        placeholder="すべて"
        onValueChange={handleTagChange}
      />
      <Flex direction="column" alignItems="center" justifyContent="center">
        {error && <div>{error}</div>}
        {posts &&
          posts.length > 0 &&
          posts.map((item) => (
            <BlogCard key={item.id} post={item} setSelectedTag={setSelectedTag} />
          ))}
      </Flex>
    </Flex>
  );
}
