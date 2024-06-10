import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Input: FC<InputProps> = ({ name, text, setText, placeholder }) => {
  const uppercaseTitle = name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  return (
    <>
      <label htmlFor={name}>{uppercaseTitle}</label>
      <input
        id={name}
        name={name}
        type="text"
        onChange={handleChange}
        value={text}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
