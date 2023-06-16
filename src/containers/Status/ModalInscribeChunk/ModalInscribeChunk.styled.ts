import { StyledModalUpload } from '@/containers/Artifacts/ModalUpload/ModalUpload.styled';
import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const StyledModalInscribeChunk = styled(StyledModalUpload)`
  .file-name-wrapper {
    display: flex;
    gap: ${px2rem(16)};
    flex-direction: column;
  }

  .left_content {
    padding: ${px2rem(11)};
    background: rgba(0, 46, 29, 0.6);
    border-radius: 12px;

    .thumbnail-wrapper {
      min-height: ${px2rem(400)};
      background: #050f0a;
      border-radius: 12px;
      margin-bottom: ${px2rem(20)};
      position: relative;
    }

    .thumbnail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
      background-color: transparent;
    }
  }

  .right_content {
    .ctaBtn {
      margin-top: ${px2rem(20)};
      font-size: ${px2rem(14)};
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;

      button {
        padding: ${px2rem(10)} ${px2rem(36)};
      }
    }
  }
`;
