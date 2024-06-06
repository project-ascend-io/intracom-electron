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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  return (
    <label>
      {name}
      <input type="text" onChange={handleChange} value={text} />
    </label>
  );
};

export default Input;
