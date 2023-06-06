import React from 'react';
import { StyledBigFileTag } from './BigFileTag.styled';
import IconSVG from '../IconSVG';
import { CDN_URL } from '@/configs';

const BigFileTag = () => {
  return (
    <StyledBigFileTag>
      <IconSVG src={`${CDN_URL}/pages/artifacts/icons/ic-big-file.svg`} />
      Big File
    </StyledBigFileTag>
  );
};

export default BigFileTag;
