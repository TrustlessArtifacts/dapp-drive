import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledBigFileBlock = styled.div`
  &.big-file-wrapper {
    padding: ${px2rem(16)};
    background-color: #fff;
    background: rgba(120, 243, 129, 0.2);
    border-radius: 8px;
    margin-bottom: ${px2rem(28)};

    .big-file {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      color: #78f381;
      gap: ${px2rem(8)};
      font-size: ${px2rem(20)};
      line-height: ${px2rem(28)};
      font-weight: 500;
      margin-bottom: ${px2rem(12)};

      svg path {
        fill: #78f381;
      }
    }
    p {
      color: #78f381;
      font-size: ${px2rem(12)};
      line-height: ${px2rem(18)};

      span {
        font-weight: 700;
      }
    }
  }
`;
