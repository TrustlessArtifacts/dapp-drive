import px2rem from "@/utils/px2rem";
import styled, { DefaultTheme } from "styled-components";
import Button from '@/components/Button';

export const ArtifactWrapper = styled.div`
  margin-top: ${px2rem(60)};

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
  padding: ${px2rem(24)} ${px2rem(32)};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.bg2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${px2rem(40)};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.white};

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
    margin-bottom: ${px2rem(8)};
  }

  .button-text {
    font-family: 'IBMPlexMono' !important;
    padding: ${px2rem(11)} ${px2rem(36)};
  }

  .file-uploader {
    opacity: 0;
    position: absolute;
    width: ${px2rem(150)};
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
  background: #39B174;
  
  p {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.white};
  }
`;
