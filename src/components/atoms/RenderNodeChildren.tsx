import {
  HTMLReactParserOptions,
  DOMNode,
  Element as HtmlElement,
  domToReact,
} from "html-react-parser";

export const renderNodeChildren = (
  domNode: HtmlElement,
  options?: HTMLReactParserOptions,
): React.ReactNode => {
  return domToReact(domNode.children as unknown as DOMNode[], options);
};
