import React, {
  useEffect,
  forwardRef,
  ForwardedRef,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useState
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
  const [textAreaHeight, setTextAreaHeight] = useState<string>("");
  const textArea = ref as React.RefObject<HTMLTextAreaElement>;

  useEffect(() => {
    if (textArea && textArea.current) {
      textArea.current.scrollTop = textArea.current.scrollHeight;
      setTextAreaHeight(textArea.current.scrollHeight + "px");
    }
  }, []);

  useAutoSizeTextArea(textArea?.current, value as string);

  return (
    <TextareaInterface
      ref={ref}
      value={value}
      {...rest}
      style={{ height: textAreaHeight }}
    />
  );
};

export default React.memo(forwardRef(Textarea));
