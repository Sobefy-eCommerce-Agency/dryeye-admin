import { Box } from "@chakra-ui/react";
import Select from "react-select";

interface MultiSelectProps {
  placeholder: string;
  name: string;
  options: { label: string; value: string }[] | null;
  onSelect(values: any[]): void;
  value: any[] | null;
  instanceId: string;
}

const MultiSelect = ({
  placeholder,
  name,
  options,
  onSelect,
  value,
  instanceId,
}: MultiSelectProps) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      background:
        state.isFocused || state.isActive
          ? "white"
          : "var(--chakra-colors-brand-grey-light)",
      borderRadius: "var(--chakra-radii-md)",
      border: "1px solid",
      borderColor: "inherit !important",
      color: "var(--chakra-colors-brand-grey-dark)",
    }),
    placeholder: () => ({
      color: "#a0aec0",
    }),
  };

  const isEnabled = options && options.length > 0 ? true : false;

  return (
    <Box height="full">
      <Select
        id={instanceId}
        instanceId={instanceId}
        value={value}
        isMulti
        name={name}
        options={options || []}
        placeholder={placeholder}
        onChange={(values) => {
          if (values instanceof Array) {
            onSelect(values);
          }
        }}
        styles={customStyles}
        isDisabled={!isEnabled}
      />
    </Box>
  );
};

export default MultiSelect;
