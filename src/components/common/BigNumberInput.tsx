import TextField from "@mui/material/TextField";

import { big, isNumber } from "@/lib/math";

import type { ChangeEvent } from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import type { BigNumber } from "@/lib/math";

type Props = Omit<TextFieldProps, "onChange" | "type" | "value"> & {
  onChange: (bn: BigNumber) => void;
  value: BigNumber;
  max?: BigNumber;
  min?: BigNumber;
};

/**
 * Creates an input control that handles and modifies a BigNumber value.
 */
export default function BigNumberInput(props: Props) {
  const { onChange, value, max, min, ...textFieldProps } = props;

  const { inputProps = {}, ...otherTextFieldProps } = textFieldProps;
  if (min !== undefined) {
    inputProps.min = min.toFixed(0);
  }
  if (max !== undefined) {
    inputProps.max = max.toFixed(0);
  }

  const inputValue = isNumber(value) ? value.toFixed(0) : "";

  function inputOnChange(e: ChangeEvent<HTMLInputElement>) {
    const valueStr = e.target.value;
    const newValue = isNumber(valueStr) ? big(valueStr) : big(Number.NaN);
    onChange(newValue);
  }

  return (
    <TextField
      type="number"
      onChange={inputOnChange}
      value={inputValue}
      inputProps={inputProps}
      {...otherTextFieldProps}
    />
  );
}
