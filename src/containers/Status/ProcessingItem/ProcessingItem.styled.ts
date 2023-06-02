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
  position: relative;

  .thumbnail {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: contain;
    z-index: 1;
    padding: ${px2rem(12)};
  }

  .thumbnailOverlay {
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    object-fit: contain;
    z-index: 1;
    background: rgba(0, 0, 0, 0.7);
    display: grid;
    place-items: center;
  }
`;

export const InfoWrapper = styled.div`
  .fileName {
    color: white;
  }
`;
