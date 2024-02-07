import { DetailedHTMLProps, ButtonHTMLAttributes, FC } from "react";
import { ButtonInterface } from "./style";

type commonButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface customType {
  context: string | React.ReactElement;
  posX?: string | number;
  posY?: string | number;
  size?: string | number;
  bgColor?: string;
  color?: string;
}

const Button: FC<customType & commonButtonProps> = ({ context, ...rest }) => {
  return <ButtonInterface {...rest}>{context}</ButtonInterface>;
};

export default Button;
