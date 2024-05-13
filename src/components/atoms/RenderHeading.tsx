import { ReactElement } from "react";
import { As, Box } from "@chakra-ui/react";
import { DOMNode, Element as HtmlElement } from "html-react-parser";
import domToReact from "html-react-parser/lib/dom-to-react";

export const RenderHeading = (domNode: HtmlElement): ReactElement => {
  const children: DOMNode[] = Array.from(
    domNode.children as unknown as DOMNode[],
  );
  const titleElements = domToReact(children);
  const title = Array.isArray(titleElements)
    ? titleElements
        .map((element) => (typeof element === "string" ? element : ""))
        .join("")
    : titleElements.toString();
  const id = title.toLowerCase().replace(/\s+/g, "-");
  const fontSize =
    domNode.name === "h1" ? "2xl" : domNode.name === "h2" ? "xl" : "xl";

  // asプロパティに型アサーションを使用
  const asElement: As = domNode.name as keyof JSX.IntrinsicElements;

  return (
    <Box width="100%">
      <Box
        as={asElement}
        id={id}
        fontSize={fontSize}
        fontWeight="bold"
        mb={domNode.name === "h1" ? 3 : undefined} // テキストの下部マージンを追加
      >
        {titleElements}
      </Box>
      {domNode.name === "h1" && (
        <Box borderBottom="1px" borderColor="gray.500" />
      )}
    </Box>
  );
};
