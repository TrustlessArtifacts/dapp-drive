import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Wrapper = styled.div`
  min-height: calc(100vh - 80px);
  padding-top: ${px2rem(80)};
  padding-bottom: ${px2rem(80)};

  .pageTitle {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    font-weight: 500;
    font-size: ${px2rem(28)};
    line-height: 1.2;
    margin-bottom: ${px2rem(16)};
  }

  .pageDescription {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    font-weight: 400;
    font-size: ${px2rem(16)};
    line-height: 1.4;
    margin-bottom: ${px2rem(48)};
  }
`;
