import React, { PropsWithChildren } from 'react';
import { StyledButtonWrapper } from './ButtonWrapper.styled';

type Props = {
  variant:
    | 'primary'
    | 'white'
    | 'transparent'
    | 'primary-transparent'
    | 'green-transparent';
};

const ButtonWrapper = ({ children, variant }: PropsWithChildren<Props>) => {
  return <StyledButtonWrapper variant={variant}>{children}</StyledButtonWrapper>;
};

export default ButtonWrapper;
