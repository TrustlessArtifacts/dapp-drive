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
  margin-bottom: ${px2rem(28)};

  .thumbnail-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .thumbnail {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: cover;
    z-index: 1;
    padding: ${px2rem(12)};
  }

  .ic-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
`;

export const ThumbnailOverlay = styled.div<{ progress: number }>`
  position: absolute;
  width: calc(100% - 4px);
  height: calc(${({ progress }) => 100 - progress}% - 4px);
  left: 2px;
  bottom: 2px;
  border-radius: 12px;
  object-fit: contain;
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const InfoWrapper = styled.div`
  padding: 0 ${px2rem(16)};

  .fileName {
    color: white;
    margin-bottom: ${px2rem(16)};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .ctaBtn {
    margin-top: ${px2rem(28)};
    font-size: ${px2rem(12)};
    line-height: ${px2rem(16)};
    letter-spacing: 0.1em;
    cursor: pointer;

    .text-pending {
      white-space: nowrap;
      color: #ff9116;
    }
  }
`;
