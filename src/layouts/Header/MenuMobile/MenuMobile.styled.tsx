import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: calc(-100% - 10px);
  z-index: 99;
  transition: all 0.2s ease;
  background-color: #000;
  width: 100vw;
  height: 100vh;

  &.show {
    right: 0;
  }

  .bg {
    z-index: 1;
  }

  .inner {
    width: 100vw;
    height: 100vh;
    gap: ${px2rem(8)};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: ${px2rem(24)};
    z-index: 2;
    position: relative;
  }

  .btnMenuMobile {
    margin-bottom: ${px2rem(20)};

    img {
      width: 24px;
      height: 24px;
    }
  }

  .social {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(8)};
    margin-top: ${px2rem(8)};

    .icon {
      width: ${px2rem(34)};
      height: ${px2rem(34)};
      cursor: pointer;

      :hover {
        opacity: 0.8;
      }
    }
  }

  p {
    color: #fff;
  }
`;

export { Wrapper };
