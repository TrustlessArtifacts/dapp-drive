import styled, { CSSProperties, DefaultTheme, css } from 'styled-components';
/* eslint-disable @typescript-eslint/no-explicit-any */
export const StyledButton = styled.button<{
  bg: string;
  background?: string;
  primary: boolean;
  backgroundSize: CSSProperties['backgroundSize'];
}>`
  --bg-color: ${({ bg, theme }: { bg: string; theme: DefaultTheme }) =>
    (theme as any)[bg] || theme.white};

  border-radius: 3px !important;
  padding: 0;
  outline: none;

  background: ${({ background }: { background?: string }) => background};

  &:disabled {
    background-color: var(--bg-color);
    background: ${({ background }: { background?: string }) => background};

    opacity: 0.8;
    cursor: auto;
  }
  &:hover {
    opacity: 0.8;
  }

  &:active {
    background-color: var(--bg-color);
  }

  &.btn-primary {
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: var(--bg-color);
    --bs-btn-active-border-color: var(--bg-color);
    --bs-btn-disabled-bg: var(--bg-color);
    --bs-btn-disabled-border-color: var(--bg-color);
  }

  ${(props) =>
    props.primary &&
    css`
      background: url('https://storage.cloud.google.com/tc-cdn-prod/artifact/Landing_page/button.svg')
        no-repeat center center;
      background-size: ${props.backgroundSize};
    `}
`;
