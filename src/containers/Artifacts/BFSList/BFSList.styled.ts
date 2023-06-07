import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .title {
    font-style: normal;
    font-weight: 500;
    font-size: ${px2rem(34)};
    line-height: ${px2rem(4)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    padding: 0 ${px2rem(10)};
  }

  .list {
    min-height: 60vh;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    margin-top: ${px2rem(32)};
  }
`;

const Grid = styled.div`
  display: grid;
  justify-items: center;
  grid-gap: ${px2rem(24)};
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export { Container, Grid };
