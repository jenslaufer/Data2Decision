import React, {ChangeEvent} from "react";
import { InputTypeEnum } from "./Input";
import InputContainer from "./InputContainer";

interface CheckboxProps {
  value: boolean;
  label: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ value, name, label ,onChange}: CheckboxProps) {
  return (
    <InputContainer>
      <label className="block text-gray-700 font-bold">
        <input
          checked={value}
          className="mr-2 leading-tight"
          name={name}
          type={InputTypeEnum.Checkbox}
          onChange={onChange}
        />
        <span className="text-sm">{label}</span>
      </label>
    </InputContainer>
  );
}

export default Checkbox;
