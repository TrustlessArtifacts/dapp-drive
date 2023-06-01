import { px2rem } from '@trustless-computer/dapp-core';
import styled from 'styled-components';

export const StyledUploadFooter = styled.div<{ isUploadVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #090a0b;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.12);
  min-height: 56px;
  position: fixed;
  left: 0;
  bottom: 0;
  gap: ${px2rem(20)};
  z-index: 999;
  transition: all 0.3s ease-in-out;

  transform: ${({ isUploadVisible }) =>
    isUploadVisible ? 'translateY(100%)' : 'translateY(100)'};

  --translate-icon: -23%;

  .icons {
    display: flex;

    div:nth-of-type(2) {
      transform: translateX(calc(var(--translate-icon) * 1));
    }
    div:nth-of-type(3) {
      transform: translateX(calc(var(--translate-icon) * 2));
    }
    div:nth-of-type(4) {
      transform: translateX(calc(var(--translate-icon) * 3));
    }
  }

  .text {
    font-size: ${px2rem(14)};
    line-height: ${px2rem(20)};

    span:first-of-type {
      opacity: 0.7;
    }
    color: #ffffff;
  }

  .button {
    position: relative;
    p {
      font-size: ${px2rem(12)};
      color: #1c1c1c;
      text-transform: uppercase;
      font-weight: 500;
      letter-spacing: 0.1em;
    }

    .file-uploader {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      opacity: 0;
      z-index: 10;
    }
  }
`;
