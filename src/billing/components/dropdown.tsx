import React, { ChangeEvent, FC } from "react";

import { DropdownProps } from "../types";
import "../billing.css";

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
    <div className="input-group">
      <label htmlFor={name}>{uppercaseTitle}</label>
      {fields[name].error && (
        <span className="error-message">Please enter a {name}</span>
      )}
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
        required
      >
        <option className="placeholder" value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((item: string) => (
          <option key={item} value={item}>
            {item[0].toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
