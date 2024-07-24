import React, { FC } from "react";
import toTitleCase from "../../utils/titlecase/titlecase";
import { InputProps } from "../../types/input";
import "./input.css";

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
