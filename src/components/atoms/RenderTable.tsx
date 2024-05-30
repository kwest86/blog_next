import { ReactElement } from "react";
import {
  HTMLReactParserOptions,
  DOMNode,
  Element as HtmlElement,
  domToReact,
} from "html-react-parser";
import { Table, Tbody, Tr, Th, Td, TableContainer, Box } from "@chakra-ui/react";

export const RenderTable = (
  domNode: HtmlElement,
  options: HTMLReactParserOptions,
): ReactElement | null => {
  const tbody = domNode.children.find(
    (child): child is HtmlElement => child.type === "tag" && child.name === "tbody",
  );

  if (!tbody) {
    return null;
  }

  const rows = tbody.children.filter(
    (child): child is HtmlElement => child.type === "tag" && child.name === "tr",
  );

  return (
    <Box display="flex" justifyContent="center" my={5}>
      <TableContainer>
        <Table variant="simple" border="1px" borderColor="gray.200" size="md">
          <Tbody>
            {rows.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {row.children
                  .filter(
                    (child): child is HtmlElement =>
                      child.type === "tag" &&
                      (child.name === "th" || child.name === "td"),
                  )
                  .map((cell, cellIndex) => {
                    const { colspan, rowspan } = cell.attribs;
                    const cellContent = domToReact(
                      cell.children as unknown as DOMNode[],
                      options,
                    );

                    // <p>タグにtext-alignが指定されていればそれに従う
                    let textAlign: "left" | "center" | "right" | "justify" = "left";
                    const paragraph = cell.children.find(
                      (child): child is HtmlElement =>
                        child.type === "tag" && child.name === "p",
                    );
                    if (paragraph && paragraph.attribs.style) {
                      const alignMatch =
                        paragraph.attribs.style.match(/text-align:\s*([\w-]+)/i);
                      if (alignMatch) {
                        textAlign = alignMatch[1] as
                          | "left"
                          | "center"
                          | "right"
                          | "justify";
                      }
                    }

                    if (cell.name === "th") {
                      return (
                        <Th
                          key={cellIndex}
                          colSpan={colspan ? parseInt(colspan) : 1}
                          rowSpan={rowspan ? parseInt(rowspan) : 1}
                          border="1px"
                          bg="gray.200"
                          textAlign={textAlign}
                          px={10}
                        >
                          {cellContent}
                        </Th>
                      );
                    } else {
                      return (
                        <Td
                          key={cellIndex}
                          colSpan={colspan ? parseInt(colspan) : 1}
                          rowSpan={rowspan ? parseInt(rowspan) : 1}
                          border="1px"
                          textAlign={textAlign}
                          px={5}
                        >
                          {cellContent}
                        </Td>
                      );
                    }
                  })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
