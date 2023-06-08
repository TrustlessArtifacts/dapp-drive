import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledFileChunk = styled.div`
  display: flex;
  align-items: center;
  gap: ${px2rem(12)};

  .chunks {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${px2rem(4)};

    .chunk-block {
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

        &.blink {
          animation: blink 1s infinite;
        }
      }
    }
  }

  .fileSize {
    color: white;
    /* flex-basis: ${px2rem(130)}; */
    white-space: nowrap;

    span {
      opacity: 0.7;
    }
  }

  @keyframes blink {
    0% {
    }
    50% {
      background: #78f381;
      box-shadow: 0px 0px 0px 1px rgba(120, 243, 129, 0.5);
    }
    100% {
    }
  }
`;
