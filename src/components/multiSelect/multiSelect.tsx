import { FormLabel, Box } from "@chakra-ui/react";
import Select from "react-select";

interface MultiSelectProps {
  id: string;
  label: string;
  placeholder: string;
  name: string;
  options: { label: string; value: string }[];
}

const MultiSelect = ({
  id,
  label,
  placeholder,
  name,
  options,
}: MultiSelectProps) => {
  return (
    <Box>
      <FormLabel htmlFor={id} fontSize={12} fontWeight="normal">
        {label}
      </FormLabel>
      <Select
        id={id}
        isMulti
        name={name}
        options={options}
        placeholder={placeholder}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </Box>
  );
};

export default MultiSelect;
