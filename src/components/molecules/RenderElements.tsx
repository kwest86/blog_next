import { ReactElement } from "react";
import {
  HTMLReactParserOptions,
  DOMNode,
  Element as HtmlElement,
  domToReact,
} from "html-react-parser";
import {
  Box,
  ListItem,
  Image,
  Text,
  Heading,
  UnorderedList,
  OrderedList,
  Code,
} from "@chakra-ui/react";
import { CodeBlock } from "../atoms/CodeBlock";
import { RenderBlockquote } from "../atoms/RenderBlockquote";
import React from "react";
import { RenderTable } from "../atoms/RenderTable";
import { LinkCardWrapper } from "../atoms/LinkCard";

let uniqueId = 0;

// 汎用的なHTML要素レンダラー
const renderGenericElement = (
  domNode: HtmlElement,
  options: HTMLReactParserOptions,
): ReactElement => {
  const { style, class: className, ...otherAttribs } = domNode.attribs;

  // スタイル属性をパース
  const styleProps: any = {};
  if (style) {
    const styles = style.split(";").map((s) => s.trim());
    styles.forEach((styleRule) => {
      const [property, value] = styleRule.split(":");
      if (property && value) {
        const camelCaseKey = property
          .trim()
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        styleProps[camelCaseKey] = value.trim();
      }
    });
  }

  // クラス名を処理
  const classProps = className ? { className } : {};

  // 見出し要素の特別な処理
  if (domNode.name.match(/^h[1-6]$/)) {
    const level = parseInt(domNode.name.charAt(1));
    const fontSize = level === 1 ? "2xl" : level === 2 ? "xl" : "lg";
    const fontWeight = "bold";
    const mb = level === 1 ? 3 : 2;

    return React.createElement(
      Heading,
      {
        key: `${domNode.name}-${uniqueId++}`,
        as: domNode.name as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
        fontSize,
        fontWeight,
        mb,
        ...classProps,
        ...styleProps,
        ...otherAttribs,
      },
      domNode.children.length > 0
        ? domToReact(domNode.children as DOMNode[], options)
        : null,
    );
  }

  // リスト要素の処理
  if (domNode.name === "ul") {
    return React.createElement(
      UnorderedList,
      {
        key: `${domNode.name}-${uniqueId++}`,
        spacing: 2,
        styleType: "disc",
        marginLeft: 4,
        ...classProps,
        ...styleProps,
        ...otherAttribs,
      },
      domToReact(domNode.children as DOMNode[], options),
    );
  }

  if (domNode.name === "ol") {
    return React.createElement(
      OrderedList,
      {
        key: `${domNode.name}-${uniqueId++}`,
        ...classProps,
        ...styleProps,
        ...otherAttribs,
      },
      domToReact(domNode.children as DOMNode[], options),
    );
  }

  // リストアイテム要素の処理
  if (domNode.name === "li") {
    return React.createElement(
      ListItem,
      {
        key: `${domNode.name}-${uniqueId++}`,
        ...classProps,
        ...styleProps,
        ...otherAttribs,
      },
      domToReact(domNode.children as DOMNode[], options),
    );
  }

  // 画像要素の処理
  if (domNode.name === "img") {
    return React.createElement(Image, {
      key: `${domNode.name}-${uniqueId++}`,
      as: "img",
      objectFit: "contain",
      maxWidth: "100%",
      ...classProps,
      ...styleProps,
      ...otherAttribs,
    });
  }

  // figure要素の処理
  if (domNode.name === "figure") {
    return React.createElement(
      Box,
      {
        key: `${domNode.name}-${uniqueId++}`,
        as: "figure",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        maxHeight: "500px",
        ...classProps,
        ...styleProps,
        ...otherAttribs,
      },
      domToReact(domNode.children as DOMNode[], options),
    );
  }

  // iframe要素の処理
  if (domNode.name === "iframe") {
    return React.createElement(Box, {
      key: `${domNode.name}-${uniqueId++}`,
      as: "iframe",
      display: "flex",
      justifyContent: "center",
      style: {
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "800px",
        height: "100%",
        position: "absolute",
        border: 0,
      },
      allowFullScreen: true,
      scrolling: "no",
      allow:
        "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;",
      ...classProps,
      ...styleProps,
      ...otherAttribs,
    });
  }

  // テキスト要素の処理
  if (domNode.name === "p" || domNode.name === "span") {
    // p要素内にブロック要素があるかチェック
    const hasBlockElements = domNode.children.some(
      (child) =>
        child instanceof HtmlElement &&
        [
          "div",
          "p",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "table",
          "blockquote",
        ].includes(child.name),
    );

    if (domNode.name === "p" && hasBlockElements) {
      // p要素内にブロック要素がある場合はBoxとして処理
      return React.createElement(
        Box,
        {
          key: `${domNode.name}-${uniqueId++}`,
          as: "div", // p要素内にブロック要素がある場合はdivとして処理
          ...classProps,
          ...styleProps,
          ...otherAttribs,
        },
        domNode.children.length > 0
          ? domToReact(domNode.children as DOMNode[], options)
          : null,
      );
    }

    return React.createElement(
      Text,
      {
        key: `${domNode.name}-${uniqueId++}`,
        as: domNode.name,
        ...classProps,
        ...styleProps,
        ...otherAttribs,
      },
      domNode.children.length > 0
        ? domToReact(domNode.children as DOMNode[], options)
        : null,
    );
  }

  // code要素の処理
  if (domNode.name === "code") {
    return React.createElement(
      Code,
      {
        key: `${domNode.name}-${uniqueId++}`,
        ...classProps,
        ...styleProps,
        ...otherAttribs,
      },
      domToReact(domNode.children as DOMNode[], options),
    );
  }

  // その他の一般的な要素はBoxとして処理
  return React.createElement(
    Box,
    {
      key: `${domNode.name}-${uniqueId++}`,
      as: domNode.name,
      ...classProps,
      ...styleProps,
      ...otherAttribs,
    },
    domNode.children.length > 0
      ? domToReact(domNode.children as DOMNode[], options)
      : null,
  );
};

// 特殊な処理が必要な要素のマッピング
const specialElementMap: Record<
  string,
  (domNode: HtmlElement, options: HTMLReactParserOptions) => ReactElement | null
> = {
  blockquote: (domNode, options) => RenderBlockquote(domNode),
  table: (domNode, options) => RenderTable(domNode, options),
  pre: (domNode, options) => {
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
    return null;
  },
  a: (domNode, options) => <LinkCardWrapper domNode={domNode} />,
  script: (domNode, options) => {
    const { charset, ...attribs } = domNode.attribs;
    return React.createElement("script", {
      ...attribs,
      charSet: charset,
      key: domNode.attribs.id || undefined,
    });
  },
};

export const renderElements = (
  domNode: HtmlElement,
  options: HTMLReactParserOptions,
): ReactElement | null => {
  // 特殊な処理が必要な要素をチェック
  const specialHandler = specialElementMap[domNode.name];
  if (specialHandler) {
    return specialHandler(domNode, options);
  }

  // 一般的な要素の処理
  return renderGenericElement(domNode, options);
};
