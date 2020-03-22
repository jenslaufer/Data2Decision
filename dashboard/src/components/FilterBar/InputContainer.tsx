import React from "react";

interface InputContainerProps {
  label?: string;
  children: any;
}

function InputContainer({ label, children }: InputContainerProps) {
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

export default InputContainer;
