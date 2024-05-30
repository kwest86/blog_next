"use client";

import { ReactElement, useCallback, useState } from "react";
import { Box, Tooltip } from "@chakra-ui/react";
import { BiCopyAlt } from "react-icons/bi";
import SyntaxHighlighter from "react-syntax-highlighter";
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBlockProps = {
  codeHtml: string;
  language: string;
};

export function CodeBlock({ codeHtml, language }: CodeBlockProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(codeHtml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  }, [codeHtml]);

  return (
    <Box
      as="div"
      rounded="md"
      position="relative"
      width="100%"
      padding={1}
      bg="black"
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <Box position="relative">
        <SyntaxHighlighter language={language} style={hybrid} showLineNumbers={false}>
          {codeHtml}
        </SyntaxHighlighter>
        <Tooltip
          label="コピーしました！"
          isOpen={isCopied}
          placement="top"
          bg="gray.700"
          color="white"
        >
          <Box
            as="button"
            onClick={handleCopyClick}
            position="absolute"
            top={2}
            right={2}
            bg="black"
            color="white"
            display={isFocused ? "flex" : "none"}
            alignItems="center"
            padding={2}
            borderWidth={0}
          >
            <BiCopyAlt />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
