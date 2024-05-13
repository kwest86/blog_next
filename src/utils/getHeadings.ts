import parse, { Element as HtmlElement } from "html-react-parser";
import { DOMNode } from "html-react-parser";
import { HeadingType } from "../components/atoms/TableContentHeader";

export const getHeadings = (content: string): HeadingType[] => {
  const headings: HeadingType[] = [];
  const parserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof HtmlElement && domNode.name.match(/^h[1-3]$/)) {
        const level = parseInt(domNode.name.substring(1));
        const title =
          domNode.children[0] && "data" in domNode.children[0]
            ? domNode.children[0].data
            : "";
        const id = title.toLowerCase().replace(/\s+/g, "-");
        headings.push({ id, title, level });
      }
      return null;
    },
  };
  parse(content, parserOptions);
  return headings;
};
