import px2rem from '@/utils/px2rem';
import { Modal } from 'react-bootstrap';
import styled, { DefaultTheme } from 'styled-components';

export const StyledModalUpload = styled(Modal)`
  &.modal {
    --bs-modal-color: white;
    --bs-modal-bg: #04150f;
  }

  .modal-dialog {
    width: fit-content;
    max-width: fit-content;
  }

  .modal-content {
    border-radius: 20px;
    position: relative;
    &:after {
      content: '';
      border-radius: 20px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid transparent;
      pointer-events: none !important;
      background: linear-gradient(
          138.24deg,
          rgba(120, 170, 143, 0.8) 1.72%,
          rgba(2, 47, 22, 0.64) 101.88%
        )
        border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  .modal-header {
    border-bottom: none;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    padding-top: ${px2rem(18)};
    padding-right: ${px2rem(18)};
  }

  .modal-body {
    padding: ${px2rem(32)};
    padding-top: ${px2rem(7)};

    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${px2rem(20)};
  }

  .modal-footer {
    border-top: none;
  }

  /* ======= Custom modal ========== */

  .dropZone {
    width: 100%;
  }

  .font-medium {
    color: white;
  }

  .preview-wrapper {
    padding: ${px2rem(11)};
    background: rgba(0, 46, 29, 0.6);
    border-radius: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .thumbnail-wrapper {
      min-height: ${px2rem(200)};
      position: relative;
      flex: 1;
    }

    img {
      background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg5};
      width: 100%;
      height: 100%;
      object-fit: contain;
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;
      border-radius: 8px;
      background: #050f0a;
    }
  }

  .error-text {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.text6};
  }

  .file-upload-name {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: ${px2rem(16)};
    margin: ${px2rem(20)} ${px2rem(16)} ${px2rem(10)};

    p:not(.file-name) {
      opacity: 0.7;
    }
  }

  .upload-fee {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: ${px2rem(16)};
    padding: ${px2rem(16)};
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg5};
    border: 1px solid;
    border-color: ${({ theme }: { theme: DefaultTheme }) => theme.text2};
    margin-bottom: ${px2rem(40)};

    p {
      color: white;
    }
  }

  .file-name {
    max-width: calc(100% - 32px);
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
  }

  .confirm-btn {
    width: 100%;

    .confirm-text {
      color: black;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding-top: ${px2rem(11)};
      padding-bottom: ${px2rem(11)};
    }
  }

  .right_content {
    background: rgba(0, 46, 29, 0.6);
    padding: ${px2rem(24)};
    border-radius: 16px;

    .confirm-btn-wrapper {
      margin-left: auto;
      margin-right: auto;
    }
  }

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
