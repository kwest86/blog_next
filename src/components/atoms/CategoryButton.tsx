"use client";

import { ReactElement } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface CategoryButtonProps {
  id: string;
  name: string;
  linkTo?: string;
  setSelectedName?: (tag: string) => void;
}

export function CategoryButton({
  id,
  name,
  linkTo,
  setSelectedName,
}: CategoryButtonProps): ReactElement {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedName && setSelectedName(id);
    if (linkTo) {
      router.push(linkTo);
    }
  };

  return (
    <Button size="sm" mr={2} onClick={handleClick} bg="gray.200">
      {name}
    </Button>
  );
}
