import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .show-all-btn {
    z-index: 10;
    position: relative;
    display: flex;
    align-items: center;
    gap: ${px2rem(8)};
    justify-content: flex-end;
    margin-bottom: ${px2rem(24)};

    span {
      color: white;
    }
    input {
      width: ${px2rem(16)};
      height: ${px2rem(16)};
      border: 1px solid white;
    }
  }

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
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export { Container, Grid };
