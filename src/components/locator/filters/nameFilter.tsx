import { Box, FormLabel, Input } from "@chakra-ui/react";

interface NameFilterProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const NameFilter = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}: NameFilterProps) => {
  return (
    <Box>
      <FormLabel htmlFor={id} fontSize={12} fontWeight="normal">
        {label}
      </FormLabel>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        background="white"
      />
    </Box>
  );
};

export default NameFilter;
