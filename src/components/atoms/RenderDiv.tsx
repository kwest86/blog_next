import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { renderNodeChildren } from "./RenderNodeChildren";
import { HTMLReactParserOptions, Element as HtmlElement } from "html-react-parser";

export const RenderDiv = (
  domNode: HtmlElement,
  options: HTMLReactParserOptions,
): ReactElement | null => {
  if (domNode.attribs.style) {
    const styleString = domNode.attribs.style;
    const styles = styleString.split(";").reduce(
      (acc, style) => {
        const [key, value] = style.split(":");
        if (key && value) {
          const camelCaseKey = key
            .trim()
            .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          acc[camelCaseKey] = value.trim();
        }
        return acc;
      },
      {} as { [key: string]: string },
    );

    return (
      <Box
        position="relative"
        paddingBottom="56.25%"
        height={0}
        overflow="hidden"
        width="100%"
        style={styles}
      >
        {renderNodeChildren(domNode, options)}
      </Box>
    );
  }
  return (
    <Box width="100%" mb={4}>
      {renderNodeChildren(domNode, options)}
    </Box>
  );
};
