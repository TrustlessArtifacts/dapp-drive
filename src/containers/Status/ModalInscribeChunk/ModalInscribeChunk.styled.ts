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
    border-radius: 16px;

    .thumbnail-wrapper {
      min-height: ${px2rem(400)};
      background: #050f0a;
      border-radius: 12px;
      margin-bottom: ${px2rem(20)};
    }
  }

  .right_content {
    .ctaBtn {
      margin-top: ${px2rem(20)};
      font-size: ${px2rem(14)};
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;
    }
  }
`;
