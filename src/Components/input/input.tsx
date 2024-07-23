import React, { ChangeEvent, FC, InputHTMLAttributes } from "react";
import toTitleCase from "../../utils/titlecase/titlecase";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  value: string;
  type: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Input: FC<InputProps> = ({
  name,
  value,
  handleChange,
  placeholder,
  type,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{toTitleCase(name)}</label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
