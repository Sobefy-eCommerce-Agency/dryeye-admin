import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { FieldProps } from "formik";
import { FieldSet } from "../../types/interfaces/entities";
import { AddressComponent } from "../../types/interfaces/practices";
import CheckBoxGroupField from "./CheckBoxGroup/CheckBoxGroupField";
import MultiProducts from "./MultiProducts/MultiProducts";
import AddressAutocomplete from "./placesAutocomplete";
import SelectAutocomplete from "./selectAutocomplete";

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
  const { id, label, placeholder, type, list, dependsOf, async } = fieldConfig;
  const error = form.errors[id] !== "" && form.errors[id] !== undefined;
  const touched = form.touched[id] !== undefined;

  // Check field types
  const renderField = () => {
    switch (type) {
      case "addressAutocomplete":
        return (
          <AddressAutocomplete
            placeholder={placeholder ? placeholder : ""}
            id={id}
            onSelect={setAddressComponent}
            field={field}
            form={form}
            meta={meta}
          />
        );
      case "selectAutocomplete":
        if (list) {
          return (
            <SelectAutocomplete
              id={id}
              placeholder={placeholder ? placeholder : ""}
              field={field}
              form={form}
              meta={meta}
              list={list}
              dependsOf={dependsOf}
              async={async || false}
            />
          );
        }
        return "The current field is not configured";
      case "checkboxGroup":
        if (list) {
          return (
            <CheckBoxGroupField
              id={id}
              field={field}
              form={form}
              meta={meta}
              list={list}
            />
          );
        }
        return "The current field is not configured";
      case "switch":
        return (
          <Flex height="full" alignItems="center">
            <Switch
              id={id}
              size="lg"
              colorScheme="purple"
              isChecked={field.value}
              onChange={(event) => {
                form.setFieldValue(id, event.target.checked);
              }}
            />
          </Flex>
        );
      case "textArea":
        return <Textarea mt={3} {...field} id={id} placeholder={placeholder} />;
      case "multiProducts":
        return <MultiProducts id={id} form={form} meta={meta} field={field} />;
      case "text":
      case "tel":
      case "email":
        return <Input {...field} id={id} placeholder={placeholder} />;
    }
  };

  return (
    <FormControl
      isInvalid={error && touched}
      display="flex"
      flexDirection="column"
    >
      {label ? (
        <FormLabel htmlFor={id} fontSize={12} fontWeight="normal">
          {label}
        </FormLabel>
      ) : null}
      {renderField()}
      <FormErrorMessage>{form.errors[id]}</FormErrorMessage>
    </FormControl>
  );
};

export default FieldForm;
