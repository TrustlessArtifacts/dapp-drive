import React, { PropsWithChildren } from 'react';
import IconSVG from '../IconSVG';
import { CDN_URL } from '@/configs';
import { StyledBigFileBlock } from './BigFileBlock.styled';

type Props = {
  title?: string;
  text?: string;
};

const BigFileBlock = ({
  title = 'Big File',
  children,
}: PropsWithChildren<Props>) => {
  return (
    <StyledBigFileBlock className="big-file-wrapper">
      <div className="big-file">
        <IconSVG
          src={`${CDN_URL}/pages/artifacts/icons/ic-big-file.svg`}
          maxWidth="20"
          maxHeight="20"
          className="icon"
        />
        {title}
      </div>
      {children}
    </StyledBigFileBlock>
  );
};

export default BigFileBlock;
