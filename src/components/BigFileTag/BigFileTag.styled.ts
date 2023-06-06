import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledBigFileTag = styled.div`
  padding: ${px2rem(2)} ${px2rem(8)};
  color: white;
  display: flex;
  align-items: center;
  gap: ${px2rem(4)};
  text-transform: uppercase;
  font-size: ${px2rem(12)};
  line-height: ${px2rem(16)};
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`;
