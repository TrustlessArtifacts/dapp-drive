import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const FileEstimateFee = styled.div`
  .est-fee {
    margin-bottom: ${px2rem(24)};
  }

  .est-fee-options {
    display: flex;
    align-items: center;
    gap: ${px2rem(10)};
  }

  .est-fee-item {
    flex: 1;
    padding: ${px2rem(8)} ${px2rem(16)};
    border: 1px solid #cecece;
    border-radius: 8px;
    display: grid;
    place-items: center;
    text-align: center;
    opacity: 1;
  }

  .ext-price {
    font-size: ${px2rem(14)};

    span {
      font-size: ${px2rem(12)};
    }
  }

  .title-text {
    margin-bottom: ${px2rem(10)};
  }
`;
