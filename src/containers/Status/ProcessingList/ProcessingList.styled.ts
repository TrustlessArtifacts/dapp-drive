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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${px2rem(20)};

    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
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
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
  }

  .loadmore-btn {
    color: #fff;
    padding: ${px2rem(8)} ${px2rem(36)};
  }
`;
