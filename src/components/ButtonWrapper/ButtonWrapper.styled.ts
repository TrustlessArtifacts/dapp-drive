import styled from 'styled-components';

export const StyledButtonWrapper = styled.div<{
  variant:
    | 'primary'
    | 'white'
    | 'transparent'
    | 'primary-transparent'
    | 'green-transparent';
}>`
  position: relative;
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
