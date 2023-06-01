import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

  .text {
    font-style: normal;
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(26)};
    margin-right: ${px2rem(16)};
    color: white;
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
