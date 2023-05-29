import { PropsWithChildren } from 'react';
import { CSSProperties } from 'styled-components';
import { StyledButton } from './Button.styled';

export type ButtonProps = {
  bg?: CSSProperties['backgroundColor'];
  background?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
  primary?: boolean;
  backgroundSize?: CSSProperties['backgroundSize'];
  props?: HTMLButtonElement;
};

const Button = ({
  type,
  bg = 'bg1',
  background,
  className,
  onClick,
  children,
  backgroundSize = 'auto',
  primary = false,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <StyledButton
      type={type}
      bg={bg}
      background={background}
      className={className}
      onClick={onClick}
      primary={primary}
      backgroundSize={backgroundSize}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
