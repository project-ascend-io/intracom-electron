import { InputHTMLAttributes } from "react";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type: string;
  helperText?: string;
  // these props are used in conjunction with react-hook-form
  register: any;
  errors: any;
}
