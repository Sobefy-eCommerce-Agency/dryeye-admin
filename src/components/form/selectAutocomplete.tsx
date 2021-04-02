import { useState, useEffect } from "react";
import { FieldProps } from "formik";
import AsyncSelect from "react-select/async";
import { CustomersApi, PracticesApi } from "../../configuration/axiosInstances";
import { SelectAutocompleteList } from "../../types/commons/commons";
import { FormatSelectAutocompleteData } from "../../utils/format";
import { Customer } from "../../types/interfaces/customers";
import { Practice } from "../../types/interfaces/practices";

interface SelectAutocompleteProps {
  id: string;
  placeholder: string;
  list: SelectAutocompleteList;
  dependsOf?: SelectAutocompleteList | null;
}

type dataObject = {
  id: string;
  label: string;
};

const SelectAutocomplete = ({
  id,
  placeholder,
  list,
  dependsOf = null,
  field,
  form,
}: SelectAutocompleteProps & FieldProps) => {
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState<dataObject[]>([]);
  const [value, setValue] = useState<dataObject | null>(null);

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
    const EntityAPI = () => {
      switch (list) {
        case "customers":
          return CustomersApi;
        case "practices":
          return PracticesApi;
      }
    };

    const FetchEntityData = (value?: string) => {
      EntityAPI()
        .get(value)
        .then((response) => {
          const { data } = response;
          if (data) {
            const formattedData = FormatSelectAutocompleteData(data, list);
            if (formattedData) {
              setData(formattedData);
              setDisabled(false);

              // Populate edit field
              if (field.value) {
                let filteredData = [];
                switch (list) {
                  case "customers":
                    filteredData = data.filter(
                      (el: Customer) => el.doctor === field.value
                    );
                    break;
                  case "practices":
                    filteredData = data.filter(
                      (el: Practice) => el.practice === field.value
                    );
                    break;
                }
                if (filteredData.length === 1) {
                  switch (list) {
                    case "customers":
                      setValue({
                        id: String(field.value),
                        label: `${filteredData[0].first_name} ${filteredData[0].last_name}`,
                      });
                      break;
                    case "practices":
                      setValue({
                        id: String(field.value),
                        label: filteredData[0].name,
                      });
                      break;
                  }
                }
              }
            }
          }
        });
    };

    if (data.length === 0 && !dependsOf) {
      FetchEntityData();
    }
    if (dependsOf) {
      switch (list) {
        case "practices":
          if (values && values.owner) {
            FetchEntityData(values.owner);
          }
      }
    }
  }, [data, list, field.value, dependsOf, values]);

  return (
    <AsyncSelect
      id={id}
      placeholder={placeholder}
      defaultOptions={data}
      loadOptions={loadOptions}
      isDisabled={disabled}
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
          setValue(null);
        }
      }}
    />
  );
};

export default SelectAutocomplete;
