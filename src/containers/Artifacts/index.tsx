import Text from '@/components/Text';
import React, { useContext, useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import BFSList from './BFSList';
import {
  UploadFileContainer,
  ArtifactWrapper,
  PreserveButton,
} from './Artifacts.styled';
import ModalUpload from './ModalUpload';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
// import { useRouter } from 'next/router';
// import { ROUTE_PATH } from '@/constants/route-path';
import { showError } from '@/utils/toast';
import { WalletContext } from '@/contexts/wallet-context';

const Artifacts: React.FC = () => {
  // const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } = useContext(WalletContext);

  const handleConnectWallet = async () => {
    try {
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      console.log(err);
      onDisconnect();
    }
  };

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const onSizeError = (): void => {
    showError({
      message: `File size error, maximum file size is ${
        BLOCK_CHAIN_FILE_LIMIT * 1000
      }kb.`,
    });
  };

  const handlePreverseArtifact = () => {
    if (!isAuthenticated) handleConnectWallet();
    else {
      setShowUploadModal(true);
    }
  };

  useEffect(() => {
    if (file) {
      setShowUploadModal(true);
    }
  }, [file]);

  return (
    <ArtifactWrapper>
      <UploadFileContainer>
        <div className="upload_left">
          <div className="upload_content">
            <p className="upload_title">Artifacts</p>
            <Text size="medium" className="upload_desc">
              Cheap. Immutable. Fully on-chain. Large files are supported too.
            </Text>
          </div>
        </div>
        <div className="upload_right">
          <PreserveButton onClick={handlePreverseArtifact}>
            <Text
              className="button-text"
              size="medium"
              color="bg1"
              fontWeight="medium"
            >
              Preserve Artifact
            </Text>
            {/* <Text size="regular" fontWeight="regular" className="button-sub-text">
              Max 350kb each
            </Text> */}
          </PreserveButton>
          <FileUploader
            handleChange={onChangeFile}
            name={'fileUploader'}
            maxSize={BLOCK_CHAIN_FILE_LIMIT}
            onSizeError={onSizeError}
            classes={`file-uploader ${!isAuthenticated ? 'hidden' : ''}`}
          />
        </div>
      </UploadFileContainer>
      <BFSList />
      <ModalUpload
        show={showUploadModal}
        handleClose={() => setShowUploadModal(false)}
        file={file}
        setFile={setFile}
      />
    </ArtifactWrapper>
  );
};

export default Artifacts;
