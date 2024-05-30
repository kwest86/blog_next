import { ReactElement } from "react";
import {
  HTMLReactParserOptions,
  DOMNode,
  Element as HtmlElement,
  domToReact,
} from "html-react-parser";
import { Box, ListItem, Image } from "@chakra-ui/react";
import { CodeBlock } from "../atoms/CodeBlock";
import { RenderHeading } from "../atoms/RenderHeading";
import { renderNodeChildren } from "../atoms/RenderNodeChildren";
import { RenderBlockquote } from "../atoms/RenderBlockquote";
import React from "react";
import { RenderParagraph } from "../atoms/RenderParagraph";
import { RenderTable } from "../atoms/RenderTable";
import { RenderList } from "../atoms/RenderList";
import { RenderDiv } from "../atoms/RenderDiv";

let uniqueId = 0;

export const renderElements = (
  domNode: HtmlElement,
  options: HTMLReactParserOptions,
): ReactElement | null => {
  switch (domNode.name) {
    case "h1":
    case "h2":
    case "h3":
      return RenderHeading(domNode);
    case "p":
      return RenderParagraph(domNode, options);
    case "blockquote":
      return RenderBlockquote(domNode);
    case "ul":
    case "ol":
      return RenderList(domNode, options);
    case "li":
      return <ListItem>{renderNodeChildren(domNode, options)}</ListItem>;
    case "pre": {
      const codeNode = domNode.children.find(
        (child) => child instanceof HtmlElement && child.name === "code",
      );
      if (codeNode && codeNode instanceof HtmlElement) {
        const languageClass = codeNode.attribs.class || "";
        const language = languageClass.replace("language-", "");

        const rawCodeContent = codeNode.children
          .map((child) => {
            if (child.type === "text") {
              return child.data;
            }
            return "";
          })
          .join("");

        return <CodeBlock codeHtml={rawCodeContent} language={language} />;
      }
      break;
    }
    case "figure":
      return (
        <Box display="flex" justifyContent="center" width="100%" maxHeight="500px">
          {renderNodeChildren(domNode, options)}
        </Box>
      );
    case "img":
      return (
        <Image
          src={domNode.attribs.src}
          alt={domNode.attribs.alt}
          objectFit="contain"
          maxWidth="100%"
        />
      );
    case "iframe":
      return (
        <Box
          as="iframe"
          src={domNode.attribs.src}
          display="flex"
          justifyContent="center"
          style={{
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "800px",
            height: "100%",
            position: "absolute",
            border: 0,
          }}
          allowFullScreen
          scrolling="no"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
        />
      );
    case "div":
      return RenderDiv(domNode, options);
    case "script": {
      const { charset, ...attribs } = domNode.attribs;
      return React.createElement("script", {
        ...attribs,
        charSet: charset,
        key: domNode.attribs.id || undefined,
      });
    }
    case "table": {
      return RenderTable(domNode, options);
    }
    default:
      return React.createElement(
        domNode.name,
        { key: `${domNode.name}-${uniqueId++}`, ...domNode.attribs },
        domNode.children.length > 0
          ? domToReact(domNode.children as DOMNode[], options)
          : null,
      );
  }
  return null;
};
