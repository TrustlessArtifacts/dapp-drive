import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledStatusPage = styled.div`
  color: white;

  .pageTitle {
    font-size: ${px2rem(24)};
    line-height: ${px2rem(28)};
    margin-bottom: ${px2rem(16)};
    font-weight: 500;
  }

  .pageDescription {
    color: white;
    font-size: ${px2rem(16)};
    line-height: ${px2rem(22)};
    opacity: 0.7;
    margin-bottom: ${px2rem(48)};
  }
`;
