"use client";

import { ReactElement, useEffect, useState } from "react";
import { Box, Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { FiCircle } from "react-icons/fi";

export type HeadingType = {
  id: string;
  title: string;
  level: number;
};

interface TableOfContentsProps {
  headings: HeadingType[];
}

export function TableContentHeader({
  headings,
}: TableOfContentsProps): ReactElement {
  const headerHight = 40;
  const [isOpen, setIsOpen] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offsetHeight = headerHight + 10;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = document.getElementById(heading.id);

        if (element && element.offsetTop - offsetHeight <= scrollPosition) {
          setActiveHeadingId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings, headerHight]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = headerHight + 10;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <Box
      position="sticky"
      top={0}
      left={0}
      right={0}
      zIndex={2}
      bg="white"
      width="100%"
      height={`${headerHight}px`}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      onClick={toggleOpen}
      cursor="pointer"
    >
      <Flex alignItems="center" color="gray.500">
        <Text mr={2} color="gray.500">
          目次
        </Text>
        {isOpen ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
      </Flex>
      {isOpen && (
        <Box
          position="absolute"
          top="40px"
          bg="white"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="md"
          p={4}
          zIndex={1}
        >
          <List spacing={2}>
            <Text color="gray.500" cursor="pointer" onClick={scrollToTop}>
              ページトップ
            </Text>
            {headings.map((heading) => (
              <ListItem key={heading.id} display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  width="20px"
                  justifyContent="center"
                >
                  <ListIcon
                    as={FiCircle}
                    color={
                      activeHeadingId === heading.id ? "blue.500" : "gray.300"
                    }
                    boxSize={`${0.5 + (3 - heading.level) * 0.25}rem`}
                    mr={2}
                    fill="currentColor"
                  />
                </Box>
                <Box>
                  <Text
                    onClick={() => scrollToHeading(heading.id)}
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {heading.title}
                  </Text>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
