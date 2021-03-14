import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FieldProps } from "formik";
import { FieldSet } from "../../types/interfaces/entities";
import { AddressComponent } from "../../types/interfaces/practices";
import AddressAutocomplete from "./placesAutocomplete";

interface FieldFormProps {
  fieldConfig: FieldSet;
  setAddressComponent: React.Dispatch<
    React.SetStateAction<AddressComponent | null>
  >;
}

const FieldForm = ({
  fieldConfig,
  field,
  form,
  meta,
  setAddressComponent,
}: FieldFormProps & FieldProps) => {
  const { id, label, placeholder, type } = fieldConfig;
  const error = form.errors[id] !== "" && form.errors[id] !== undefined;
  const touched = form.touched[id] !== undefined;

  // Check field types
  const renderField = () => {
    switch (type) {
      case "addressAutocomplete":
        return (
          <AddressAutocomplete
            placeholder={placeholder}
            id={id}
            onSelect={setAddressComponent}
            field={field}
            form={form}
            meta={meta}
          />
        );
      case "text":
      case "tel":
      case "email":
        return <Input {...field} id={id} placeholder={placeholder} />;
    }
  };

  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel htmlFor={id} fontSize={12} fontWeight="normal">
        {label}
      </FormLabel>
      {renderField()}
      <FormErrorMessage>{form.errors[id]}</FormErrorMessage>
    </FormControl>
  );
};

export default FieldForm;
