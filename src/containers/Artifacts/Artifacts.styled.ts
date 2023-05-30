import Button from '@/components/Button';
import px2rem from '@/utils/px2rem';
import styled from 'styled-components';

export const ArtifactWrapper = styled.div`
  margin-top: ${px2rem(40)};

  @media screen and (max-width: 768px) {
    margin-top: ${px2rem(40)};

    .upload_left {
      display: block;
    }

    .upload_content {
      margin-bottom: ${px2rem(24)};
    }
  }
`;

export const UploadFileContainer = styled.div`
  padding: 0 ${px2rem(32)};
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${px2rem(40)};
  color: white;
  z-index: 2;
  position: relative;

  .upload_left {
    display: flex;
    gap: ${px2rem(20)};
    align-items: center;
    flex: 1;
  }

  .upload_right {
    position: relative;
    overflow: hidden;
  }

  .upload_title {
    margin-bottom: ${px2rem(16)};
    font-weight: 500;
    font-size: ${px2rem(40)};
    line-height: ${px2rem(48)};
    color: white;
  }

  .upload_desc {
    font-weight: 400;
    font-size: ${px2rem(20)};
    line-height: ${px2rem(30)};
    color: white;
    width: 75ch;
    margin-bottom: ${px2rem(28)};
  }

  .button-sub-text {
    color: rgba(255, 255, 255, 0.7);
  }

  .file-uploader {
    opacity: 0;
    position: absolute;
    width: ${px2rem(150)};
    height: ${px2rem(80)};
    top: 0;
  }

  @media screen and (max-width: 768px) {
    display: block;
    padding: ${px2rem(24)};

    .create-btn {
      width: 100%;
    }

    .upload_description {
      margin-bottom: ${px2rem(16)};
    }
  }
`;

export const PreserveButton = styled(Button)`
  /* background: #39b174; */
  /* padding: ${px2rem(11)} ${px2rem(36)}; */

  .button-text {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: black;
    white-space: nowrap;
  }
`;
