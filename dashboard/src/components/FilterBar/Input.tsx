import React from "react";

export enum InputTypeEnum {
  Date = "date",
  Checkbox = "checkbox"
}

interface InputProps {
  type: string;
  name: string;
  value: string;
  placeholder?: string;
}

function Input({ type, name, value, placeholder }: InputProps) {
  return (
    <input
      value={value}
      name={name}
      type={type}
      placeholder={placeholder}
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    />
  );
}

export default Input;
