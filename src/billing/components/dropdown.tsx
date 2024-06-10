import React, {
  ChangeEvent,
  FC,
  SelectHTMLAttributes,
  useEffect,
  useState,
} from "react";

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: FC<DropdownProps> = ({
  name,
  options,
  setSelected,
  selected,
}) => {
  const uppercaseTitle = name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <label htmlFor={name}>{uppercaseTitle}</label>
      <select
        name={name}
        id={name}
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
      >
        <option value="" disabled>
          {" "}
          Select An Option
        </option>
        {options.map((item: string) => (
          <option value={item}>{item[0].toUpperCase() + item.slice(1)}</option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
