"use client";

import { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Text,
  Link,
  Image,
  AspectRatio,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  DOMNode,
  Element as HtmlElement,
  Text as HtmlText,
  domToReact,
} from "html-react-parser";
import { LinkInfo, fetchLinkInfo } from "../../utils/fetchBlogInfo";
import { FiExternalLink } from "react-icons/fi";
import { mobileQuery, useMediaQuery } from "@/hooks/useMediaQuery";

function PcLinkCard({
  title,
  description,
  image,
  favicon,
  url,
}: LinkInfo & { url: string }): ReactElement {
  return (
    <Link href={url} isExternal width="100%">
      <Box
        height="120px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        _hover={{ bg: "gray.100" }}
      >
        <Box display="flex" height="100%">
          <Box
            pl={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mr={4}
            flexGrow={1}
            minWidth={0}
            height="100%"
          >
            <Box fontSize="lg" fontWeight="bold" isTruncated>
              {title}
            </Box>
            <Box fontSize="md" mb="1" isTruncated>
              {description}
            </Box>
            <Box display="flex" alignItems="center">
              {favicon && (
                <Image
                  as="img"
                  src={favicon}
                  boxSize="16px"
                  mr="2"
                  verticalAlign="middle"
                />
              )}
              <Text fontSize="sm" color="gray.500" isTruncated>
                {url}
              </Text>
            </Box>
          </Box>
          <Box height="140px" width="140px" flexShrink={0}>
            {image ? (
              <AspectRatio ratio={1}>
                <Image src={image} objectFit="cover" />
              </AspectRatio>
            ) : (
              <Box width="100%" paddingTop="100%" bg="gray.100" />
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

function SpLinkCard({
  title,
  description,
  image,
  favicon,
  url,
}: LinkInfo & { url: string }): ReactElement {
  return (
    <Link href={url} isExternal>
      <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%">
        {image && (
          <Box width="120px" flexShrink={0}>
            <AspectRatio ratio={1}>
              <Image src={image} objectFit="cover" />
            </AspectRatio>
          </Box>
        )}
        <Box
          p="2"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flexGrow={1}
          minWidth={0}
        >
          <Box fontSize="sm" fontWeight="bold" mb="1" isTruncated>
            {title}
          </Box>
          <Box fontSize="xs" mb="1" isTruncated>
            {description}
          </Box>
          <Box display="flex" alignItems="center">
            {favicon && (
              <Image
                as="img"
                src={favicon}
                boxSize="12px"
                mr="2"
                verticalAlign="middle"
              />
            )}
            <Text fontSize="xs" color="gray.500" isTruncated>
              {url}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
}

const LinkCard = (domNode: HtmlElement): ReactElement | null => {
  const isSp = useMediaQuery(mobileQuery);
  const [linkInfo, setLinkInfo] = useState<{
    title: string;
    description: string;
    image: string;
    url: string;
    favicon: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const href = domNode.attribs.href;

  useEffect(() => {
    async function fetchInfo() {
      if (!href) {
        return;
      }
      try {
        const info = await fetchLinkInfo(href);
        setLinkInfo({ ...info, url: href });
      } catch (err) {
        console.error(`Failed to fetch link info for ${href}:`, err);
        setError("Failed to fetch link information.");
      }
    }
    fetchInfo();
  }, [href]);

  if (error) {
    return (
      <a href={domNode.attribs.href}>
        {domNode.children.map((child) => {
          if (child.type === "text") {
            return child.data;
          }
          return null;
        })}
      </a>
    );
  }

  if (!linkInfo) {
    return null;
  }

  const { title, description, image, url, favicon } = linkInfo;

  if (isSp) {
    return (
      <SpLinkCard
        title={title}
        description={description}
        image={image}
        favicon={favicon}
        url={url}
      />
    );
  }
  return (
    <PcLinkCard
      title={title}
      description={description}
      image={image}
      favicon={favicon}
      url={url}
    />
  );
};

export const LinkCardWrapper = (props: { domNode: HtmlElement }) => {
  const { domNode } = props;
  const href = domNode.attribs.href;
  let innerText = "";

  if (domNode.children[0] instanceof HtmlText) {
    innerText = domNode.children[0].data;
  }

  // NOTE: <a href="https://tekumogu.com/blog">https://tekumogu.com/blog</a></p>の時はリンクカード
  // NOTE: <a href="https://tekumogu.com/blog">リンク</a>の時はテキスト中リンク
  if (href === innerText) {
    return LinkCard(props.domNode);
  }

  const children = Array.from(domNode.children) as DOMNode[];

  return (
    <Link href={href} isExternal textDecoration="underline" color="blue.500">
      {domToReact(children)}
      <Icon as={FiExternalLink} mx="2px" />
    </Link>
  );
};
