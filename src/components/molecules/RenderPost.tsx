"use client";

import { ReactElement } from "react";
import { Flex, VStack, Box, Heading, Image } from "@chakra-ui/react";
import parse, {
  HTMLReactParserOptions,
  Element as HtmlElement,
} from "html-react-parser";
import { CategoryButton } from "../atoms/CategoryButton";
import { DateTextIcon } from "../atoms/DateTextIcon";
import { ImWarning } from "react-icons/im";
import IconWithText from "../atoms/IconWithText";
import { TableContentHeader } from "../atoms/TableContentHeader";
import { renderElements } from "./RenderElements";
import { BlogContentsType } from "@/type";
import { getHeadings } from "@/utils/getHeadings";

function isMoreThanOneYearAgo(dateString: string): boolean {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const date = new Date(dateString);
  return date < oneYearAgo;
}

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof HtmlElement) {
      return renderElements(domNode, options);
    }
  },
};

export function RenderPost({
  blogContents,
}: {
  blogContents: BlogContentsType;
}): ReactElement {
  const headings = getHeadings(blogContents.content);
  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <VStack spacing={4} align="stretch" width="100%">
        <TableContentHeader headings={headings} />
        {blogContents?.thumbnail && (
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            maxHeight="500px"
            px={5}
            mb={5}
          >
            <Image src={blogContents?.thumbnail} objectFit="contain" />
          </Box>
        )}
        <Heading as="h1" size="lg">
          {blogContents?.title}
        </Heading>
        <Flex>
          {blogContents?.tags.map((tag, index) => (
            <CategoryButton
              key={index}
              id={tag.id}
              name={tag.name}
              linkTo={`/blog?tag=${tag.id}`}
            />
          ))}
        </Flex>
        <Box mb={5} w="100%">
          <Flex>
            {blogContents?.revisedAt && (
              <DateTextIcon date={blogContents?.revisedAt} type="revicedAt" />
            )}
            {blogContents?.createdAt && (
              <DateTextIcon date={blogContents?.createdAt} type="createdAt" />
            )}
          </Flex>
          {blogContents?.revisedAt && isMoreThanOneYearAgo(blogContents.revisedAt) && (
            <Flex w="100%" bg="yellow" mt={2}>
              <IconWithText
                icon={ImWarning}
                text="この記事は最終更新日から1年以上が経過しています"
                mt={2}
                ml={2}
              />
            </Flex>
          )}
        </Box>
        {blogContents && <>{parse(blogContents.content, options)}</>}
      </VStack>
    </Flex>
  );
}
