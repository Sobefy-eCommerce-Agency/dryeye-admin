import { Checkbox, CheckboxGroup, SimpleGrid, Box } from "@chakra-ui/react";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { SelectAutocompleteList } from "../../../types/commons/commons";
import { FieldOptions } from "../../../types/interfaces/entities";
import { ServicesAndTreatmentsApi } from "../../../configuration/axiosInstances";
import { FormatCheckBoxData } from "../../../utils/format";

interface CheckBoxGroupFieldProps {
  id: string;
  list: SelectAutocompleteList;
}

const CheckBoxGroupField = ({
  id,
  list,
  field,
  form,
}: CheckBoxGroupFieldProps & FieldProps) => {
  const [options, setOptions] = useState<FieldOptions[] | null>(null);
  const { value } = field;
  const { setFieldValue, setFieldTouched } = form;

  useEffect(() => {
    if (options === null) {
      ServicesAndTreatmentsApi.get(
        list === "dryEyeTreatments" ? "treatment" : "service"
      ).then((response) => {
        const { data } = response;
        if (data) {
          // convert to value label
          const valueLabelData = FormatCheckBoxData(data, list);
          if (valueLabelData) {
            setOptions(valueLabelData);
          }
        }
      });
    }
  }, [options, list]);

  return (
    <>
      {options && (
        <CheckboxGroup
          value={value}
          onChange={(values) => {
            setFieldValue(id, values);
            setFieldTouched(id);
          }}
        >
          <SimpleGrid mt={3} columns={3} rowGap={3}>
            {options.map((op) => (
              <Checkbox
                key={op.value}
                colorScheme="purple"
                value={op.value}
                alignItems="flex-start"
              >
                <Box marginTop={-1}> {op.label}</Box>
              </Checkbox>
            ))}
          </SimpleGrid>
        </CheckboxGroup>
      )}
    </>
  );
};

export default CheckBoxGroupField;
