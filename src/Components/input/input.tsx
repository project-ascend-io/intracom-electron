import React, { FC, InputHTMLAttributes } from "react";
import toTitleCase from "../../utils/titlecase/titlecase";
import "./input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type: string;
  helperText?: string;
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
  helperText,
}) => {
  return (
    <div className="input-group">
      <label className="label" htmlFor={name}>
        {toTitleCase(name)}
      </label>
      {errors[name] && (
        <span className="input-error-message">{errors[name]?.message}</span>
      )}
      <input
        className="input"
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
      />
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
};

export default Input;
