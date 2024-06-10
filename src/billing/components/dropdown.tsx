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
}

const Dropdown: FC<DropdownProps> = ({ name, options }) => {
  const [selected, setSelected] = useState("");
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
