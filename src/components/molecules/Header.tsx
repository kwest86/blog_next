"use client";

import { ReactElement } from "react";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import IconWithText from "../atoms/IconWithText";
import Link from "next/link";
import { mobileQuery, useMediaQuery } from "@/hooks/useMediaQuery";
import { APP_TITLE } from "@/environments";

function PcHeader(): ReactElement {
  return (
    <Box as="header" bg="bg.secondaly" w="100%" py={4}>
      <Flex mx="auto" align="center" w="90%" maxW="1200px">
        <Link href="/" passHref>
          <Text fontSize="xl" fontWeight="bold" ml={5}>
            {APP_TITLE}
          </Text>
        </Link>
        <Spacer />
        <Box display="flex" height="35px" alignItems="center" mr={5}>
          <Box mr={4}>
            <IconWithText
              icon={CgWebsite}
              text="サイトについて"
              to="/blog/p0yx72iz6wq"
            />
          </Box>
          {/* <Box mr={4}>
            <IconWithText icon={IoPerson} text="管理人について" to="/about" />
          </Box>
          <Box>
            <IconWithText icon={GrContact} text="問い合わせ" to="/contact" />
          </Box> */}
        </Box>
      </Flex>
    </Box>
  );
}

function SpHeader(): ReactElement {
  return (
    <Box as="header" bg="bg.secondaly" w="100%" py={4}>
      <Flex maxW="container.lg" mx="auto" width="100%" align="center" mr={10}>
        <Link href="/" passHref>
          <Text fontSize="xl" fontWeight="bold" ml={5}>
            {APP_TITLE}
          </Text>
        </Link>
        <Spacer />
        <Box mr={5} zIndex={3}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu />}
              variant="outline"
              bg="bg.tertiary"
            />
            <MenuList>
              <MenuItem>
                <IconWithText
                  icon={CgWebsite}
                  text="サイトについて"
                  to="/blog/p0yx72iz6wq"
                />
              </MenuItem>
              {/* <MenuItem>
                <IconWithText
                  icon={IoPerson}
                  text="管理人について"
                  to="/about"
                />
              </MenuItem>
              <MenuItem>
                <IconWithText
                  icon={GrContact}
                  text="問い合わせ"
                  to="/contact"
                />
              </MenuItem> */}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
}

export function Header(): ReactElement {
  const isSp = useMediaQuery(mobileQuery);

  if (isSp) {
    return <SpHeader />;
  }
  return <PcHeader />;
}
