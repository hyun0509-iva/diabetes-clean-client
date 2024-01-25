import React, {
  forwardRef,
  ForwardedRef,
  DetailedHTMLProps,
  TextareaHTMLAttributes
} from "react";
import { useAutoSizeTextArea } from "hooks/common/useAutoSizeTextArea";
import { TextareaInterface } from "./styles";

type commonTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const Textarea = (
  { value, ...rest }: commonTextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const textArea = ref as React.RefObject<HTMLTextAreaElement>;
  useAutoSizeTextArea(textArea?.current, value as string);
  return <TextareaInterface ref={ref} {...rest} />;
};

export default React.memo(forwardRef(Textarea));
