import React, { FC, InputHTMLAttributes } from "react";
import toTitleCase from "../../utils/titlecase/titlecase";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type: string;
  // these props are used in conjunction with react-hook-form
  register: any;
  errors: any;
}
const Input: FC<InputProps> = ({
  name,
  register,
  placeholder,
  type,
  errors,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{toTitleCase(name)}</label>
      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
      />
      {errors[name] && <span>{errors[name]?.message}</span>}
    </div>
  );
};

export default Input;
