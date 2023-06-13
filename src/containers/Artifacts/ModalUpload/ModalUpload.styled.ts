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
    min-width: ${px2rem(600)};

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
    padding-top: ${px2rem(12)};
    padding-right: ${px2rem(12)};
  }

  .modal-body {
    padding: ${px2rem(24)};
    padding-top: ${px2rem(10)};
    padding-bottom: ${px2rem(32)};
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
      position: relative;
      min-height: ${px2rem(200)};
      max-height: ${px2rem(400)};
      flex: 1;
    }

    img {
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
    gap: ${px2rem(8)};
    margin: ${px2rem(20)} ${px2rem(12)} ${px2rem(10)};

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
    background-color: transparent;

    .confirm-text {
      color: black;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding-top: ${px2rem(11)};
      padding-bottom: ${px2rem(11)};
    }
  }

  .right_content {
    border-radius: 16px;
    margin-top: ${px2rem(20)};

    .confirm-btn-wrapper {
      margin-top: ${px2rem(20)};
      margin-left: auto;
      margin-right: auto;
    }
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
  .big-file-note {
    margin-top: ${px2rem(20)};
    max-width: 55ch;
  }

  .big-file-wrapper {
    padding: ${px2rem(16)};
    background-color: #fff;
    background: rgba(120, 243, 129, 0.2);
    border-radius: 8px;
    margin-bottom: ${px2rem(20)};
    margin-top: ${px2rem(20)};

    .big-file {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      color: #78f381;
      gap: ${px2rem(4)};
      font-size: ${px2rem(14)};
      line-height: ${px2rem(20)};
      font-weight: 500;
      margin-bottom: ${px2rem(4)};

      svg path {
        fill: #78f381;
      }
    }
    p {
      color: #78f381;
      font-size: ${px2rem(12)};
      line-height: ${px2rem(16)};

      span {
        font-weight: 700;
      }
    }
  }

  .noti-wrapper {
    display: flex;
    align-items: center;
    gap: ${px2rem(8)};
    padding: ${px2rem(8)} ${px2rem(12)};
    border: 1px solid #f9d03f;
    border-radius: 8px;
    margin-top: ${px2rem(20)};

    p {
      color: #f9d03f;
    }
  }
`;
