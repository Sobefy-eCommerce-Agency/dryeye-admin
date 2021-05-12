import { Input } from "@chakra-ui/react";
interface FilterProps {
  type: "text";
  value: string;
  onChange(e: string): void;
  placeholder: string;
}

const Filter = ({ placeholder, type, onChange, value }: FilterProps) => {
  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(String(e.target.value));
  };

  if (type === "text") {
    return (
      <Input
        value={value}
        placeholder={placeholder}
        background={value ? "white" : "brand.grey.light"}
        color="brand.grey.dark"
        transition="all ease-in .2s"
        onChange={(e) => handleInputChange(e)}
      />
    );
  }
  return null;
};

export default Filter;
