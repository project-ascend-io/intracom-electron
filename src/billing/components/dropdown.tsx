import React, { ChangeEvent, FC, SelectHTMLAttributes } from "react";

interface SelectLog {
  value: string;
  error: boolean;
}
interface BillingForm {
  "street address": SelectLog;
  city: SelectLog;
  state: SelectLog;
  "postal code": SelectLog;
  country: SelectLog;
  [key: string]: SelectLog; //Needed to add this index signature, Im not exactly sure why but I think it has something to do with the fact that Im dynamically indexing into the form below using the [] brackets (line 41).
}
interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[];
  placeholder?: string;
  fields: BillingForm;
  setFields: React.Dispatch<React.SetStateAction<BillingForm>>;
}

const Dropdown: FC<DropdownProps> = ({
  name,
  options,
  setFields,
  fields,
  placeholder,
}) => {
  const uppercaseTitle = name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <label htmlFor={name}>{uppercaseTitle}</label>
      {fields[name].error && <span>Please enter a {name}</span>}
      <select
        name={name}
        id={name}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setFields((prev) => ({
            ...prev,
            [name]: { value: e.target.value, error: false },
          }))
        }
        value={fields[name].value}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((item: string) => (
          <option key={item} value={item}>
            {item[0].toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
