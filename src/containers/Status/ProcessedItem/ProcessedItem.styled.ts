import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledProcessedItem = styled.div`
  padding: ${px2rem(12)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    box-shadow: 4px 4px 10px rgba(99, 255, 124);
  }

  .info-wrapper {
    display: flex;
    align-items: center;
    color: white;
    gap: ${px2rem(30)};

    .file-name {
      display: flex;
      align-items: center;
      gap: ${px2rem(8)};
      margin-bottom: ${px2rem(16)};

      p {
        color: white;
      }
    }
  }

  .thumbnail-wrapper {
    max-width: ${px2rem(110)};
    aspect-ratio: 1 / 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 8px;
      background: #050f0a;
    }
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: ${px2rem(12)};

    p {
      color: white;
      opacity: 0.7;
    }
  }

  .preserved-note {
    color: #78f381;
    font-size: ${px2rem(12)};
    line-height: ${px2rem(16)};
  }
`;
