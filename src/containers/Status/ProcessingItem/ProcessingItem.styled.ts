import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

export const StyledProcessingItem = styled.div`
  background: rgba(0, 46, 29, 0.6);
  border-radius: 16px;
  padding: ${px2rem(12)} ${px2rem(12)} ${px2rem(28)};
`;

export const ThumbnailWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;

  .thumbnail {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: contain;
    z-index: 1;
  }

  .thumbnailOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: contain;
    z-index: 1;
  }
`;
