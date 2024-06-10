import React, { SelectHTMLAttributes, InputHTMLAttributes } from "react";

export interface FormInput {
  value: string;
  error: boolean;
}
export interface BillingForm {
  "street address": FormInput;
  city: FormInput;
  state: FormInput;
  "postal code": FormInput;
  country: FormInput;
  [key: string]: FormInput; //Needed to add this index signature, Im not exactly sure why but I think it has something to do with the fact that Im dynamically indexing into the object below using the [] bracket syntax.
}
export interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[];
  placeholder?: string;
  fields: BillingForm;
  setFields: React.Dispatch<React.SetStateAction<BillingForm>>;
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  fields: BillingForm;
  setFields: React.Dispatch<React.SetStateAction<BillingForm>>;
}
