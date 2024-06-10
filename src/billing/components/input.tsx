import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";

interface InputLog {
  value: string;
  error: boolean;
}
interface BillingForm {
  "street address": InputLog;
  city: InputLog;
  state: InputLog;
  "postal code": InputLog;
  country: InputLog;
  [key: string]: InputLog; //Needed to add this index signature, Im not exactly sure why but I think it has something to do with the fact that Im dynamically indexing into the form below using the [] brackets (line 41).
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  fields: BillingForm;
  setFields: React.Dispatch<React.SetStateAction<BillingForm>>;
}

const Input: FC<InputProps> = ({ name, fields, setFields, placeholder }) => {
  const uppercaseTitle = name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFields((prev) => ({
      ...prev,
      [name]: { value: e.target.value, error: false },
    }));
  return (
    <>
      <label htmlFor={name}>{uppercaseTitle}</label>
      {fields[name].error && <span>Please enter a {name}</span>}
      <input
        id={name}
        name={name}
        type="text"
        onChange={handleChange}
        value={fields[name].value}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
