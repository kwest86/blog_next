"use client";

import { ReactElement, useEffect, useState } from "react";
import { BlogContentsType } from "../../type";
import { Flex, Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { CategoryButton } from "./CategoryButton";
import NO_IMAGE from "../../assets/images/base/no_image.png";
import { DateTextIcon } from "./DateTextIcon";
import { mobileQuery, useMediaQuery } from "@/hooks/useMediaQuery";

interface BlogCardProps {
  post: BlogContentsType;
  featuredImage?: string;
  setSelectedTag?: (tag: string) => void;
}

function PcBlogCard({
  post,
  featuredImage,
  setSelectedTag,
}: BlogCardProps): ReactElement {
  return (
    <Box mt={2} width="100%">
      {post && (
        <Link href={`/blog/${post.id}`} passHref>
          <Flex
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            p={4}
            align="center"
            alignItems="flex-start"
            minH="150px"
            _hover={{ bg: "gray.100" }}
          >
            <Image
              src={featuredImage ?? NO_IMAGE.src}
              alt="Featured Image"
              h="150px"
              w="200px"
              mr={4}
              objectFit="contain"
            />
            <Box flex={1}>
              <Flex>
                {post?.revisedAt && (
                  <DateTextIcon date={post?.revisedAt} type="revicedAt" />
                )}
                {post?.createdAt && (
                  <DateTextIcon date={post?.createdAt} type="createdAt" />
                )}
              </Flex>
              <Box fontSize="md" fontWeight="bold" mb="2">
                {post.title}
              </Box>
              <Flex>
                {post.tags.map((tag, index) => (
                  <CategoryButton
                    key={index}
                    id={tag.id}
                    name={tag.name}
                    setSelectedName={setSelectedTag}
                  />
                ))}
              </Flex>
              <Box color="gray.700" mt={2}>
                {post.description}
              </Box>
            </Box>
          </Flex>
        </Link>
      )}
    </Box>
  );
}

function SpBlogCard({ post, setSelectedTag }: BlogCardProps): ReactElement {
  return (
    <Box width="100%">
      {post && (
        <Link href={`/blog/${post.id}`} passHref>
          <Box
            width="100%"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            p={4}
            display="flex"
            flexDirection="column"
            mt={2}
            _hover={{ bg: "gray.100" }}
          >
            <Box flex={1}>
              <Flex>
                {post?.revisedAt && (
                  <DateTextIcon date={post?.revisedAt} type="revicedAt" />
                )}
                {post?.createdAt && (
                  <DateTextIcon date={post?.createdAt} type="createdAt" />
                )}
              </Flex>
              <Box fontSize="lg" fontWeight="bold" mb="2">
                {post.title}
              </Box>
              <Flex mb={2}>
                {post.tags.map((tag, index) => (
                  <CategoryButton
                    key={index}
                    id={tag.id}
                    name={tag.name}
                    setSelectedName={setSelectedTag}
                  />
                ))}
              </Flex>
              <Box color="gray.700">{post.description}</Box>
            </Box>
          </Box>
        </Link>
      )}
    </Box>
  );
}

export function BlogCard({ post, setSelectedTag }: BlogCardProps): ReactElement {
  const isSp = useMediaQuery(mobileQuery);
  const [featuredImage, setFeaturedImage] = useState<string | undefined>();

  useEffect(() => {
    if (post.thumbnail) {
      setFeaturedImage(post.thumbnail);
    }
  }, [post]);

  if (isSp) {
    return (
      <SpBlogCard
        post={post}
        featuredImage={featuredImage}
        setSelectedTag={setSelectedTag}
      />
    );
  }
  return (
    <PcBlogCard
      post={post}
      featuredImage={featuredImage}
      setSelectedTag={setSelectedTag}
    />
  );
}
