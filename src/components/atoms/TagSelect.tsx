import { ReactElement } from "react";
import { Select } from "@chakra-ui/react";

interface TagSelectProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  placeholder: string;
  onValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function TagSelect({
  options,
  selectedValue,
  placeholder,
  onValueChange,
}: TagSelectProps): ReactElement {
  return (
    <Select
      value={selectedValue}
      onChange={onValueChange}
      placeholder={placeholder}
      width="200px"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
