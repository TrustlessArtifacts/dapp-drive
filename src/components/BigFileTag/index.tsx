import React from 'react';
import IconSVG from '../IconSVG';
import { CDN_URL } from '@/configs';
import { StyledBigFileTag } from './BigFileTag';

const BigFileTag = ({ color = 'white' }: { color?: string }) => {
  return (
    <StyledBigFileTag color={color}>
      <IconSVG
        src={`${CDN_URL}/pages/artifacts/icons/ic-big-file.svg`}
        maxWidth="12"
        maxHeight="12"
        className="icon"
      />
      Big File
    </StyledBigFileTag>
  );
};

export default BigFileTag;
