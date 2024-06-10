import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";

import { InputProps } from "../types";

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
