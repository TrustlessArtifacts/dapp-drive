import { px2rem } from '@trustless-computer/dapp-core';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${px2rem(48)};

  .image {
    max-height: ${px2rem(400)};
    object-fit: contain;
  }

  .page-title {
    font-weight: 500;
    font-size: ${px2rem(40)};
    line-height: 120%;
    color: #fff;
    text-align: center;
  }
`;

export { Container };
