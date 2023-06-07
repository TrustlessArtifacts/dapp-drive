import px2rem from '@/utils/px2rem';
import { Popover } from 'react-bootstrap';
import styled, { DefaultTheme } from 'styled-components';

export const WalletPopover = styled(Popover)`
  width: ${px2rem(200)};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  /* border: 1px solid rgba(120, 170, 143); */
  background-color: transparent;

  position: relative;

  &:before {
    z-index: -1;
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: calc(100% + 3px);
    height: calc(100% + 3px);
    border-radius: 4px 0 4px 0;
    clip-path: polygon(
      20% 0%,
      95% 0,
      100% 5%,
      100% 100%,
      80% 100%,
      5% 100%,
      0 95%,
      0 0
    );

    background: linear-gradient(
      138.24deg,
      rgba(120, 170, 143, 1) 1.72%,
      rgba(2, 47, 22, 1) 101.88%
    );
  }

  .wrapper {
    padding: ${px2rem(16)} ${px2rem(20)};
    background: #04150f;
    z-index: 2;
    /* opacity: 0; */
    border-radius: 4px 0 4px 0;

    clip-path: polygon(
      20% 0%,
      95% 0,
      100% 5%,
      100% 100%,
      80% 100%,
      5% 100%,
      0 95%,
      0 0
    );
  }

  .icCopy {
    cursor: pointer;
  }

  .wallet-tc,
  .wallet-btc {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${px2rem(16)};
  }

  .wallet-item {
    display: flex;
    align-items: center;
    gap: ${px2rem(8)};
  }
  .wallet-address {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  }

  .wallet-link,
  .wallet-disconnect {
    display: flex;
    align-items: center;
    gap: ${px2rem(12)};
    cursor: pointer;

    :hover {
      opacity: 0.6;
    }

    p {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    }
  }

  .wallet-link {
    margin-top: ${px2rem(20)};
    margin-bottom: ${px2rem(20)};
    p {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
    }
  }

  .divider {
    margin-bottom: ${px2rem(16)};
    border-bottom: 1px solid #ececed;
    opacity: 0.15;
  }

  &.popover {
    /* display: none; */

    .popover-arrow {
      width: 100%;
      transform: translate(0px, 0px) !important;
    }

    .popover-arrow::after {
      width: 100%;
      border-bottom-color: transparent !important;
    }
  }
`;
