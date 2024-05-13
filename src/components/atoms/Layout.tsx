"use client";

import { ReactElement, ReactNode } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import bannarImg from "../../assets/images/base/bannar.png";
import { mobileQuery, useMediaQuery } from "@/hooks/useMediaQuery";

interface LayoutProps {
  children: ReactNode;
  isLoading: boolean;
}

function PcLayout({ children, isLoading }: LayoutProps): ReactElement {
  return (
    <Box
      w="90%"
      minW="400px"
      maxW="1200px"
      minH="100vh"
      px={8}
      pb="30px"
      mx="auto"
      bg="white"
    >
      <Box mx="auto" maxW="container.xl">
        {isLoading ? (
          <>
            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={bannarImg.src} />
              <Text mt={2} fontSize="4xl">
                Loading...
              </Text>
            </Flex>
            {children}
          </>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}

function SpLayout({ children, isLoading }: LayoutProps): ReactElement {
  return (
    <Box w="100%" minH="100vh" p={4} pb="30px" mx="auto" bg="white">
      <Box mx="auto" maxW="container.xl">
        {isLoading ? (
          <>
            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={bannarImg.src} />
              <Text mt={2} fontSize="4xl">
                Loading...
              </Text>
            </Flex>
            {children}
          </>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}

export function Layout({ children, isLoading }: LayoutProps): ReactElement {
  const isSp = useMediaQuery(mobileQuery);

  if (isSp) {
    return <SpLayout children={children} isLoading={isLoading} />;
  }
  return <PcLayout children={children} isLoading={isLoading} />;
}
