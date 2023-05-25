import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${px2rem(80)};
  flex-wrap: wrap;
  width: 100%;

  .content {
    max-width: 1920px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 ${px2rem(32)};
  }

  @media screen and (max-width: ${({ theme }: { theme: DefaultTheme }) =>
      theme.breakpoint.md}) {
    margin-top: ${px2rem(40)};
  }

  .text {
    font-style: normal;
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(26)};
    margin-right: ${px2rem(16)};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
    text-align: center;
  }
`;

const Footer = ({ height }: { height: number }) => {
  return (
    <Wrapper style={{ height }}>
      <p className="text">Open-source software. Made with ❤️ on Bitcoin.</p>
    </Wrapper>
  );
};

export default Footer;
