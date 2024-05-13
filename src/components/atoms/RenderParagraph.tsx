import { ReactElement } from "react";
import {
  HTMLReactParserOptions,
  Element as HtmlElement,
  Text as HtmlText,
  domToReact,
} from "html-react-parser";
import React from "react";
import { LinkCardWrapper } from "./LinkCard";
import { Box, BoxProps, ResponsiveValue } from "@chakra-ui/react";
import { Property } from "csstype";

export const RenderParagraph = (
  domNode: HtmlElement,
  options: HTMLReactParserOptions,
): ReactElement => {
  const styleProps: BoxProps = {};

  if (domNode.attribs.style) {
    const styles = domNode.attribs.style
      .split(";")
      .map((style) => style.trim());
    styles.forEach((style) => {
      const [property, value] = style.split(":");
      if (property && value) {
        if (property.trim() === "text-align") {
          styleProps.textAlign =
            value.trim() as ResponsiveValue<Property.TextAlign>;
        } else {
          styleProps[property.trim() as keyof BoxProps] = value.trim();
        }
      }
    });
  }

  const pChildren = domNode.children
    .map((child, index) => {
      if (child instanceof HtmlElement) {
        switch (child.name) {
          case "a":
            return <LinkCardWrapper key={`link-${index}`} domNode={child} />;
          case "br":
            return <br key={`br-${index}`} />;
          default:
            return (
              <React.Fragment key={`element-${index}`}>
                {domToReact([child], options)}
              </React.Fragment>
            );
        }
      } else if (child instanceof HtmlText) {
        const lines = child.data.split("\n");
        return (
          <React.Fragment key={`text-${index}`}>
            {lines.map((line, lineIndex) => (
              <React.Fragment key={`line-${lineIndex}`}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      }
      return null;
    })
    .filter(Boolean);

  return <Box {...styleProps}>{pChildren}</Box>;
};
