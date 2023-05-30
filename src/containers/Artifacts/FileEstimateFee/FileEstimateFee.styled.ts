import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const FileEstimateFee = styled.div`
  .est-fee {
    margin-bottom: ${px2rem(24)};
  }

  .est-fee-options {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${px2rem(20)};
  }

  .est-fee-item {
    flex: 1;
    padding: ${px2rem(8)} ${px2rem(16)};
    opacity: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-width: ${px2rem(351)};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ext-price {
    font-size: ${px2rem(14)};
    color: #fff;

    span {
      font-size: ${px2rem(12)};
    }
  }

  .sats-fee {
    opacity: 0.7;
  }

  .title-text {
    margin-bottom: ${px2rem(28)};
    text-align: center;
    text-transform: uppercase;
  }
`;
