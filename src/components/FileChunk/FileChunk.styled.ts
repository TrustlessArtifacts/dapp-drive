import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledFileChunk = styled.div`
  display: flex;
  align-items: center;
  gap: ${px2rem(12)};

  .chunks {
    display: flex;
    align-items: center;
    gap: ${px2rem(4)};

    .chunk-block {
      /* height: 9px; */
      /* width: 9px; */
      /* width: fit-content;
      height: auto; */
      /* border: 0.5px solid rgba(255, 255, 255, 0.15); */
      border-radius: 3px;
      padding: 1.5px;

      .chunk-inner {
        width: 16px;
        height: 6px;
        background: rgba(255, 255, 255, 0.3);
        border: 1.5px solid rgba(0, 46, 29, 1);
        box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.15);
        border-radius: 2px;

        &.active {
          background: #78f381;
          box-shadow: 0px 0px 0px 1px rgba(120, 243, 129, 0.5);
        }
      }
    }
  }

  .fileSize {
    color: white;

    span {
      opacity: 0.7;
    }
  }
`;
