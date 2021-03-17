import { useState, useEffect } from "react";
import { FieldProps } from "formik";
import AsyncSelect from "react-select/async";
import { CustomersApi } from "../../configuration/axiosInstances";
import { SelectAutocompleteList } from "../../types/commons/commons";
import { FormatSelectAutocompleteData } from "../utils/format";
import { Customer } from "../../types/interfaces/customers";

interface SelectAutocompleteProps {
  id: string;
  placeholder: string;
  list: SelectAutocompleteList;
  initiallyDisabled?: boolean;
  onSelect(): void;
}

type dataObject = {
  id: string;
  label: string;
};

const SelectAutocomplete = ({
  id,
  placeholder,
  list,
  initiallyDisabled = false,
  onSelect,
  field,
  form,
}: SelectAutocompleteProps & FieldProps) => {
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState<dataObject[]>([]);
  const [value, setValue] = useState<dataObject>({ id: "", label: "" });

  const { setFieldValue, setFieldTouched, values } = form;

  const filterOptions = (value: string) => {
    return data.filter((i) =>
      i.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  const loadOptions = (inputValue: string, callback: any) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 200);
  };

  useEffect(() => {
    if (data.length === 0) {
      const EntityAPI = () => {
        switch (list) {
          case "customers":
            return CustomersApi;
        }
      };
      EntityAPI()
        .get()
        .then((response) => {
          const { data } = response;
          if (data) {
            const formattedData = FormatSelectAutocompleteData(data, list);
            if (formattedData) {
              setData(formattedData);
              setDisabled(false);
              if (field.value) {
                const filteredData: Customer[] = data.filter(
                  (el: Customer) => el.doctor === field.value
                );
                if (filteredData.length === 1) {
                  setValue({
                    id: String(field.value),
                    label: `${filteredData[0].first_name} ${filteredData[0].last_name}`,
                  });
                }
              }
            }
          }
        });
    }
  }, [data, list, field.value]);

  return (
    <AsyncSelect
      id={id}
      placeholder={placeholder}
      defaultOptions={data}
      loadOptions={loadOptions}
      isDisabled={initiallyDisabled || disabled}
      cacheOptions
      isClearable
      value={value}
      onChange={(el) => {
        if (el) {
          const { id: elementId } = el;
          setFieldTouched(id);
          setFieldValue(id, elementId, true);
          setValue(el);
        } else {
          setFieldValue(id, "", true);
          setValue({ id: "", label: "" });
        }
      }}
    />
  );
};

export default SelectAutocomplete;
