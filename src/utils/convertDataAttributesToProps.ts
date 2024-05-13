import { BoxProps } from "@chakra-ui/react";
import { Element } from "domhandler";

// data-属性からBoxPropsに変換するヘルパー関数
export const convertDataAttributesToProps = (
  domNode: Element,
): Partial<BoxProps> => {
  const props: Partial<BoxProps> = {};

  Object.keys(domNode.attribs).forEach((key) => {
    if (key.startsWith("data-")) {
      const propKey = key.substring(5); // 'data-'を取り除く
      const propValue = domNode.attribs[key];
      props[propKey as keyof BoxProps] = propValue;
    }
  });

  return props;
};
