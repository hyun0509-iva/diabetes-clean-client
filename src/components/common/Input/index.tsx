import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { InputInterface } from "./styles";

type commonInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: FC<commonInputProps> = ({ ...rest }) => {
  return <InputInterface {...rest} />;
};

export default React.memo(Input);
