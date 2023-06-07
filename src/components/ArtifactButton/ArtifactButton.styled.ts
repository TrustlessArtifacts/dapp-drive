import { px2rem } from '@trustless-computer/dapp-core';
import styled from 'styled-components';

export const StyledArtifactButton = styled.div<{ objectFit: 'contain' | 'cover' }>`
  &.cta-btn {
    width: fit-content;
    height: auto;
    display: grid;
    place-items: center;
    position: relative;

    img {
      object-fit: ${({ objectFit }) => objectFit};
    }

    &:hover {
      opacity: 0.8;
    }
  }

  .btn-bg {
    z-index: 1;
    position: relative;
  }

  .btn-content {
    width: 100%;
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding-top: ${px2rem(12)};
    padding-bottom: ${px2rem(12)};
  }
`;
