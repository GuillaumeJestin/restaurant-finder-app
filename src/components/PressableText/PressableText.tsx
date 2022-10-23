import { CSSProperties, ReactNode, useRef } from "react";
import { useButton } from "react-aria";
import styled from "styled-components";

type PressableTextProps = {
  children?: ReactNode;
  onPress?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
  id?: string;
}

const PressableText = ({ children, onPress, style, disabled, id }: PressableTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { buttonProps } = useButton({ onPress, elementType: "div", isDisabled: disabled, id }, ref);

  return (
    <PressableTextContainer {...buttonProps} style={{ cursor: disabled ? "default" : "pointer", ...style }} ref={ref}>
      {children}
    </PressableTextContainer>
  )
}

export default PressableText;

const PressableTextContainer = styled.div`
  display: inline-block;
`