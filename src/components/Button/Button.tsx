import { CSSProperties, ReactNode, useRef } from 'react';
import { useButton } from 'react-aria';
import styled from 'styled-components';

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  children?: ReactNode;
  onPress?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
  id?: string;
};

const Button = ({ children, onPress, primary, secondary, style, disabled, id }: ButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { buttonProps } = useButton({ onPress, elementType: "div", isDisabled: disabled, id }, ref);

  return (
    <ButtonContainer {...{ primary, secondary }} {...buttonProps} style={{ cursor: disabled ? "default" : "pointer", ...style }} ref={ref}>
      {children}
    </ButtonContainer>
  );
};

export default Button;

type ButtonContainerProps = {
  primary?: boolean;
  secondary?: boolean;
}

const ButtonContainer = styled.div<ButtonContainerProps>`
  background: ${props => props.secondary ? props.theme.secondaryBackgroundGradient : props.theme.primaryBackgroundGradient};
  border-radius: 0.75rem;
  padding: 0.75rem 2rem;
  display: inline-block;
  color: ${props => props.theme.textColorLight};
  font-weight: bold;
`