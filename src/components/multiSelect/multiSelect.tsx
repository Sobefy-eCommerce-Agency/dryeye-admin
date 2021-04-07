import { FormLabel, Box } from "@chakra-ui/react";
import Select from "react-select";

interface MultiSelectProps {
  id: string;
  label: string;
  placeholder: string;
  name: string;
  options: { label: string; value: string }[];
  onSelect(values: any[]): void;
  value: any[] | null;
}

const MultiSelect = ({
  id,
  label,
  placeholder,
  name,
  options,
  onSelect,
  value,
}: MultiSelectProps) => {
  return (
    <Box>
      <FormLabel htmlFor={id} fontSize={12} fontWeight="normal">
        {label}
      </FormLabel>
      <Select
        value={value}
        id={id}
        isMulti
        name={name}
        options={options}
        placeholder={placeholder}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(values) => {
          if (values instanceof Array) {
            onSelect(values);
          }
        }}
      />
    </Box>
  );
};

export default MultiSelect;
