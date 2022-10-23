import { ReactNode, useRef } from "react";
import { useTextField } from "react-aria";
import styled from "styled-components";
import Label from "../../styling/styledComponents/Label";

type TextInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: ReactNode;
  readOnly?: boolean;
}

const TextInput = ({ value, onChange, label, placeholder, readOnly }: TextInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { inputProps, labelProps } = useTextField({ value, onChange, label, placeholder, isReadOnly: readOnly }, ref);

  return (
    <>
      <Label {...labelProps}>{label}</Label>
      <Input {...inputProps} ref={ref} />
    </>
  )
}

const Input = styled.input`
  display: block;
  margin-top: 0.5rem;
  min-width: 16rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: solid 2px ${props => props.theme.muted};
`;

export default TextInput;