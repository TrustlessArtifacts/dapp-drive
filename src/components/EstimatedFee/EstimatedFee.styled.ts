import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const Wrapper = styled.div`
  .est-fee-item {
    padding-bottom: ${px2rem(20)};
    padding-top: ${px2rem(20)};

    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .est-fee-title {
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: 1.4;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: ${px2rem(8)};
  }

  .est-fee-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${px2rem(8)};
  }

  .est-fee-item-title {
    font-weight: 500;
    font-size: ${px2rem(16)};
    line-height: 1.2;
    color: #fff;
  }

  .ext-price {
    font-weight: 400;
    font-size: ${px2rem(14)};
    line-height: 1.2;
    color: rgba(255, 255, 255, 0.7);
  }
`;
