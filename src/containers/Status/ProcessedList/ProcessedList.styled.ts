import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Wrapper = styled.div`
  .sectionWrapper {
    margin-bottom: ${px2rem(48)};
  }

  .sectionTitle {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    font-weight: 500;
    font-size: ${px2rem(14)};
    line-height: 1.4;
    text-transform: uppercase;
    margin-bottom: ${px2rem(24)};
    letter-spacing: 0.1em;
  }

  .dataList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${px2rem(20)};
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: ${px2rem(24)};
  }

  .loading-wrapper {
    min-height: ${px2rem(200)};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loadmore-wrapper {
    margin-top: ${px2rem(24)};
    display: flex;
    justify-content: center;
  }

  .loadmore-btn {
    color: #fff;
  }
`;
