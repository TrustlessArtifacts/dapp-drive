import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

export const Wrapper = styled.div`
  .sectionTitle {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    font-weight: 500;
    font-size: ${px2rem(14)};
    line-height: 1.4;
    text-transform: uppercase;
    margin-bottom: ${px2rem(24)};
    letter-spacing: 0.1em;
  }
`;
