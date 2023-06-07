import px2rem from '@/utils/px2rem';
import styled from 'styled-components';
import { css } from 'styled-components';

export const StyledBigFileTag = styled.div<{ color: string }>`
  padding: ${px2rem(2)} ${px2rem(8)};
  /* color: white; */
  display: flex;
  align-items: center;
  gap: ${px2rem(4)};
  text-transform: uppercase;
  font-size: ${px2rem(12)};
  line-height: ${px2rem(16)};
  /* background: rgba(255, 255, 255, 0.2); */
  border-radius: 4px;
  width: fit-content;

  ${(props) =>
    props.color === 'white' &&
    css`
      color: white;
      background: rgba(255, 255, 255, 0.2);
    `}
  ${(props) =>
    props.color === 'green' &&
    css`
      color: #78f381;
      background: rgba(120, 243, 129, 0.2);

      .icon {
        svg,
        path {
          fill: #78f381;
        }
      }
    `};
`;
