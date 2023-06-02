import { IUploadFileResponseItem } from '@/interfaces/api/files';
import React from 'react';
import { ThumbnailWrapper, StyledProcessingItem } from './ProcessingItem.styled';
import { CDN_URL } from '@/configs';

interface IProps {
  file: IUploadFileResponseItem;
}

const ProcessingItem: React.FC<IProps> = ({ file }: IProps) => {
  return (
    <StyledProcessingItem>
      <ThumbnailWrapper className="animationBorder">
        <img className="thumbnail" src={file.fullPath} alt={file.name} />
        <div className="thumbnailOverlay">
          <img src={`${CDN_URL}/icons/bi_clock-history.svg`} alt="bi_clock" />
        </div>
      </ThumbnailWrapper>
    </StyledProcessingItem>
  );
};

export default ProcessingItem;
