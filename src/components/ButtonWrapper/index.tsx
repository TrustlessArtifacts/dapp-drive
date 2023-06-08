import React, { PropsWithChildren } from 'react';
import { StyledButtonWrapper } from './ButtonWrapper.styled';
// import { CSSProperties } from 'styled-components';

// type borderProps = {
//   bgColor: CSSProperties['backgroundColor'];
//   width: CSSProperties['width'];
//   clipPath: CSSProperties['clipPath'];
//   borderRadius: CSSProperties['borderRadius'];
// };

type Props = {
  variant:
    | 'primary'
    | 'white'
    | 'transparent'
    | 'primary-transparent'
    | 'green-transparent';
};

const ButtonWrapper = ({
  children,
  //   border1Props,
  //   border2Props,
  variant,
}: PropsWithChildren<Props>) => {
  return <StyledButtonWrapper variant={variant}>{children}</StyledButtonWrapper>;
};

export default ButtonWrapper;
