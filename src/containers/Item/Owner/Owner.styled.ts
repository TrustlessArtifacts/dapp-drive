import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const Container = styled.div`
  .owner-wrapper {
    margin-top: ${px2rem(30)};
    display: flex;
    align-items: center;
    gap: ${px2rem(32)};

    .owner-description {
      color: #fff;
      font-size: ${px2rem(16)};
      line-height: 1.5;
    }

    .button-text {
      font-size: ${px2rem(12)};
    }
  }

  .upload-btn {
    padding: 0;
    position: relative;
  }

  .file-uploader {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
`;