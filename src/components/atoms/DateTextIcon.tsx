import { HStack, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import { formatDate } from "../../utils/format";
import { MdDateRange, MdUpdate } from "react-icons/md";

type DateTextProps = {
  date: string;
  type: "createdAt" | "revicedAt";
};

export function DateTextIcon({ date, type }: DateTextProps): ReactElement {
  const icon = type === "createdAt" ? <MdDateRange /> : <MdUpdate />;

  return (
    <HStack spacing={1} mr={2}>
      {icon}
      <Text color="gray.600">{formatDate(date)}</Text>
    </HStack>
  );
}
