import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { Element as HtmlElement } from "html-react-parser";
import { Tweet } from "react-twitter-widgets";
import { renderNodeChildren } from "./RenderNodeChildren";

export const RenderBlockquote = (domNode: HtmlElement): ReactElement => {
  if (domNode.attribs.class === "twitter-tweet") {
    const hrefNode = domNode.children.find(
      (child) => child instanceof HtmlElement && child.tagName === "a"
    );
    if (hrefNode instanceof HtmlElement) {
      const hrefAttr = hrefNode.attributes.find((attr) => attr.name === "href");
      if (hrefAttr) {
        const hrefValue = hrefAttr.value;
        const tweetIdMatch = hrefValue.match(/\/(\d+)/);
        if (tweetIdMatch) {
          const tweetId = tweetIdMatch[1];
          return <Tweet tweetId={tweetId} options={{ align: "center" }} />;
        }
      }
    }
  }
  return (
    <Box
      as="blockquote"
      p={4}
      bg="gray.100"
      borderLeft="4px solid"
      borderColor="gray.300"
      width="100%"
    >
      {renderNodeChildren(domNode)}
    </Box>
  );
};
