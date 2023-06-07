import Button from '@/components/Button';
import px2rem from '@/utils/px2rem';
import { Tooltip } from 'react-bootstrap';
import styled, { DefaultTheme } from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: transparent;

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

  .leftContainer {
    display: flex;
    align-items: center;
    gap: ${px2rem(40)};

    .navLink {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }

  .logo {
    display: flex;
    align-items: center;
    gap: ${px2rem(12)};
    width: fit-content;
    transform: scale(0.9);
    text-decoration: none;
  }

  .logo-title {
    font-family: var(--rowdies-font);
    font-weight: 400;
    font-size: ${px2rem(22)};
    line-height: ${px2rem(27)};
    letter-spacing: -1px;
    &:hover {
      text-decoration: none;
    }
  }

  a {
    text-decoration: unset;
  }

  .rowLink {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(32)};
    position: absolute;
    left: 50%;
    transform: translateX(-47%);
  }

  .rightContainer {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${px2rem(32)};
    position: relative;

    .external-link {
      display: flex;
      gap: ${px2rem(24)};
      justify-content: flex-end;

      @media screen and (max-width: 768px) {
        display: none;
      }

      a {
        display: flex;
        gap: ${px2rem(6)};
        align-items: center;

        &:hover {
          text-decoration: none;
          rect {
            stroke-opacity: 1;
          }
        }
      }
    }

    @media screen and (min-width: 1024px) {
      :hover {
        .dropdown {
          display: block;
          z-index: 9;
        }
      }
    }

    .btnMenuMobile {
      display: none;

      img {
        width: 24px;
        height: 24px;
      }

      @media screen and (max-width: 768px) {
        display: block;
      }
    }
  }

  .dropdown {
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 100%;
    padding-top: ${px2rem(10)};
    width: ${px2rem(200)};
    display: none;

    .dropdownMenuItem {
      background: ${({ theme }: { theme: DefaultTheme }) => theme.primary[333]};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
      padding: ${px2rem(10)} ${px2rem(16)};
      font-weight: normal;
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: flex-end;

      :hover {
        background: ${({ theme }: { theme: DefaultTheme }) => theme.primary['5b']};
      }

      :first-child {
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
      }

      :last-child {
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
      }
    }
  }
`;

const StyledLink = styled(Link)<{ active: boolean; activeColor?: string }>`
  cursor: pointer;
  font-weight: 400;
  font-size: ${px2rem(16)};
  line-height: ${px2rem(28)};
  text-decoration: none !important;
  color: ${({
    theme,
    active,
    activeColor,
  }: {
    theme: DefaultTheme;
    active: boolean;
    activeColor?: string;
  }) => (active ? activeColor || theme.white : theme.text2)};
  letter-spacing: -0.02em;

  :hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    opacity: 0.7;
  }
`;

const Anchor = styled.a<{ active: boolean }>`
  cursor: pointer;
  font-weight: 400;
  font-size: ${px2rem(16)};
  line-height: ${px2rem(28)};
  text-decoration: none !important;
  color: ${({ theme, active }: { theme: DefaultTheme; active: boolean }) =>
    active ? theme.white : theme.text2};
  letter-spacing: -0.02em;

  :hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    opacity: 0.7;
  }
`;

const WalletWrapper = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    background-color: black;
    border-radius: 4px 0 4px 0;

    clip-path: polygon(
      20% 0%,
      96% 0,
      100% 22%,
      100% 100%,
      80% 100%,
      4% 100%,
      0 80%,
      0 0
    );
    z-index: 2;
  }
  &:after {
    z-index: 1;
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 4px 0 4px 0;
    clip-path: polygon(
      20% 0%,
      96% 0,
      100% 22%,
      100% 100%,
      80% 100%,
      4% 100%,
      0 80%,
      0 0
    );
  }
`;

const WalletBalance = styled.div`
  display: flex;
  align-items: center;
  gap: ${px2rem(12)};
  padding: ${px2rem(6)} ${px2rem(15)};
  // padding-left: ${px2rem(12)};
  background-color: transparent;
  /* border-radius: 40px; */
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #282a28;
  /* border: 1px solid white; */
  border-radius: 2px 0 2px 0;

  z-index: 999;

  clip-path: polygon(
    20% 0%,
    96% 0,
    100% 22%,
    100% 100%,
    80% 100%,
    4% 100%,
    0 80%,
    0 0
  );
  position: relative;

  &:hover {
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  }

  .balance {
    display: flex;
    align-items: center;
    gap: ${px2rem(12)};

    .text {
      color: white;
    }

    .divider {
      width: 1px;
      height: 16px;
      background-color: ${({ theme }: { theme: DefaultTheme }) =>
        theme.primary['5b']};
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const WalletAdress = styled(Tooltip)`
  margin-top: ${px2rem(8)};

  .tooltip-inner {
    background-color: #424242;
    color: white;
    padding: ${px2rem(6)} ${px2rem(16)};
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
  }

  .tooltip-arrow::before {
    border-bottom-color: #424242;
  }
`;

const ConnectWalletButton = styled(Button)`
  padding: ${px2rem(4)} ${px2rem(12)};
  font-size: ${px2rem(14)};
  line-height: ${px2rem(24)};
  font-weight: 400;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  text-transform: uppercase;
  letter-spacing: 0.1em;

  :disabled {
    opacity: 0.8;
  }
`;

export {
  ConnectWalletButton,
  Wrapper,
  StyledLink,
  WalletBalance,
  WalletAdress,
  Anchor,
  WalletWrapper,
};
