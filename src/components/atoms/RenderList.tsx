import { ReactElement } from "react";
import {
  HTMLReactParserOptions,
  DOMNode,
  Element as HtmlElement,
  domToReact,
} from "html-react-parser";
import { UnorderedList, OrderedList, ListItem, ListIcon } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export const RenderList = (
  domNode: HtmlElement,
  options: HTMLReactParserOptions,
): ReactElement | null => {
  if (domNode.name === "ul") {
    return (
      <UnorderedList spacing={2} styleType="none" marginLeft={0}>
        {domNode.children.map((child, index) => {
          if (child.type === "tag" && child.name === "li") {
            return (
              <ListItem key={index} display="flex" alignItems="center">
                <ListIcon as={FaCheckCircle} color="black" />
                {domToReact(child.children as unknown as DOMNode[], options)}
              </ListItem>
            );
          }
          return null;
        })}
      </UnorderedList>
    );
  }

  if (domNode.name === "ol") {
    return (
      <OrderedList>
        {domNode.children.map((child, index) => {
          if (child.type === "tag" && child.name === "li") {
            return (
              <ListItem key={index}>
                {domToReact(child.children as unknown as DOMNode[], options)}
              </ListItem>
            );
          }
          return null;
        })}
      </OrderedList>
    );
  }

  return null;
};
