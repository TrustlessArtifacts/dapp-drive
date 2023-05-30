import styled from 'styled-components';

export const StyledArtifactButton = styled.div`
  &.cta-btn {
    width: fit-content;
    height: auto;
    display: grid;
    place-items: center;
    position: relative;

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
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    place-items: center;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;
