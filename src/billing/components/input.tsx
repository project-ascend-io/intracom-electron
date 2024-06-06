import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: FC<InputProps> = ({ name }) => {
  const [text, setText] = useState("");
  const uppercaseTitle = name
    .split(" ")
    .map((word) => word[0] + word.slice(1))
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
      />
    </>
  );
};

export default Input;
