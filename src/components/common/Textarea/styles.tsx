import styled from "@emotion/styled";
import { InputInterface } from "../Input/styles";

const Textarea = InputInterface.withComponent("textarea");

export const TextareaInterface = styled(Textarea)`
  resize: none;
  overflow-y: hidden;
`;
