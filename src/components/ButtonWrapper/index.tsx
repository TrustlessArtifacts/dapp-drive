import React, { PropsWithChildren } from 'react';
import { StyledButtonWrapper } from './ButtonWrapper.styled';

type Props = {
  className?: string;
  variant:
    | 'primary'
    | 'white'
    | 'transparent'
    | 'primary-transparent'
    | 'green-transparent'
    | 'gray';
};

const ButtonWrapper = ({
  children,
  variant,
  className,
}: PropsWithChildren<Props>) => {
  return (
    <StyledButtonWrapper className={className} variant={variant}>
      {children}
    </StyledButtonWrapper>
  );
};

export default ButtonWrapper;
