import React from "react";
import { Flex, FlexProps, Text, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

interface IconWithTextProps extends FlexProps {
  icon: React.ElementType;
  text: string;
  to?: string;
}

const IconWithText: React.FC<IconWithTextProps> = ({
  icon: Icon,
  text,
  to,
  ...rest
}) => {
  const content = (
    <Flex alignItems="center" {...rest}>
      <Icon />
      <Text ml={2}>{text}</Text>
    </Flex>
  );

  return to ? (
    <NextLink href={to} passHref>
      <ChakraLink>{content}</ChakraLink>
    </NextLink>
  ) : (
    <>{content}</>
  );
};

export default IconWithText;
