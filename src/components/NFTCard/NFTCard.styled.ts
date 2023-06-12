import styled, { DefaultTheme } from 'styled-components';
import px2rem from '@/utils/px2rem';
import Link from 'next/link';

export const Styled = styled(Link)`
  width: 100%;
  height: 100%;
  text-decoration: none !important;
  --bs-card-bg: none;

  background: transparent;

  .card-content {
    position: relative;
  }

  .card-image {
    background: rgba(0, 46, 29, 0.6);

    border-radius: 20px;

    min-height: ${px2rem(180)};
    padding: ${px2rem(20)};
    position: relative;

    .blur-circle {
      position: absolute;
      width: calc(100% - ${px2rem(80)});
      height: calc(100% - ${px2rem(80)});
      background: #076d47;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.5;
      filter: blur(40px);
      border-radius: 1000px;
      z-index: 0;

      & + div {
        z-index: 1;
        position: relative;
      }
    }

    .image {
      width: 100%;
      min-height: 100px;
      aspect-ratio: 1 / 1;
      height: auto;
      object-fit: cover;
      border-radius: 16px;
      background: #050f0a;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: grid;
      place-items: center;
      margin: ${px2rem(20)};
      border-radius: 16px;
      transition: all 0.1s;
      opacity: 0;

      .overlay-content {
        width: fit-content;
      }
    }

    &:hover {
      .overlay {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 10;
        .overlay-content {
          z-index: 10;
        }
      }
    }

    &::before {
      content: '';
      border-radius: 20px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid transparent;
      pointer-events: none !important;
      background: linear-gradient(
          138.24deg,
          rgba(120, 170, 143, 0.8) 1.72%,
          rgba(2, 47, 22, 0.64) 101.88%
        )
        border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  .card-info {
    padding: ${px2rem(16)} 0;
    display: flex;
    align-items: center;
    gap: ${px2rem(8)};

    .card-title1 {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(23)};
      color: white;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    /* .card-title2 {
      font-style: normal;
      font-weight: 500;
      font-size: ${px2rem(16)};
      line-height: ${px2rem(28)};
      color: white;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .card-title3 {
      font-style: normal;
      font-weight: 400;
      font-size: ${px2rem(14)};
      line-height: ${px2rem(26)};
      margin-top: ${px2rem(8)};
      color: #5b5b5b;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    } */
  }

  .owner-actions {
    padding: ${px2rem(16)} ${px2rem(24)};

    .transfer-button {
      background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg5};
      padding: ${px2rem(5)} ${px2rem(14)};
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      font-size: ${px2rem(14)};
      line-height: ${px2rem(24)};
      color: ${({ theme }: { theme: DefaultTheme }) => theme.primary.brand};
      width: 100%;
      font-style: normal;
      border-radius: 2px;
    }
  }
`;
