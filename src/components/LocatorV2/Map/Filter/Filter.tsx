import { Input } from "@chakra-ui/react";

interface FilterProps {
  placeholder: string;
}

const Filter = ({ placeholder }: FilterProps) => {
  return (
    <Input
      placeholder={placeholder}
      background="brand.grey.light"
      color="brand.grey.dark"
    />
  );
};

export default Filter;
