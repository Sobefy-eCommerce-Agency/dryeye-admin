import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FieldProps } from "formik";
import { FieldSet } from "../../types/interfaces/entities";

interface FieldFormProps {
  fieldConfig: FieldSet;
}

const FieldForm = ({
  fieldConfig,
  field,
  form,
}: FieldFormProps & FieldProps) => {
  const { id, label, placeholder, type, mask } = fieldConfig;
  const error = form.errors[id] !== "" && form.errors[id] !== undefined;
  const touched = form.touched[id] !== undefined;
  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel htmlFor={id} fontSize={12} fontWeight="normal">
        {label}
      </FormLabel>
      <Input {...field} id={id} placeholder={placeholder} />
      <FormErrorMessage>{form.errors[id]}</FormErrorMessage>
    </FormControl>
  );
};

export default FieldForm;
