import Text from '@/components/Text';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import BFSList from './BFSList';
import {
  UploadFileContainer,
  ArtifactWrapper,
  PreserveButton,
} from './Artifacts.styled';
import ModalUpload from './ModalUpload';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { WalletContext } from '@/contexts/wallet-context';
import ArtifactButton from '@/components/ArtifactButton';
import useWindowSize from '@/hooks/useWindowSize';
import UploadFooter from './UploadFooter';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import { showToastError } from '@/utils/toast';
import logger from '@/services/logger';

const Artifacts: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } = useContext(WalletContext);
  const { mobileScreen } = useWindowSize();

  const uploadRef = useRef<HTMLDivElement>(null);

  const isUploadVisible = useIsInViewport(uploadRef, { threshold: 0.2 });

  const handleConnectWallet = async () => {
    try {
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      logger.error(err);
      showToastError({
        message: (err as Error).message
      })
      onDisconnect();
    }
  };

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const handlePreserverArtifact = () => {
    if (!isAuthenticated) handleConnectWallet();
    else if (file) {
      setShowUploadModal(true);
    }
  };

  useEffect(() => {
    if (file) {
      setShowUploadModal(true);
    }
  }, [file]);

  return (
    <>
      <ArtifactWrapper>
        <UploadFileContainer>
          <div className="upload_left">
            <div className="upload_content">
              <p className="upload_title">Smart Inscriptions</p>
              <Text className="upload_desc">
                Inscribe anything, any size, on BRC-721 with smart contract,
                eternally on Bitcoin.
              </Text>
            </div>
          </div>
          <div className="upload_right" ref={uploadRef}>
            <ArtifactButton
              variant="primary"
              width={mobileScreen ? 274 : 300}
              height={mobileScreen ? 55 : 79}
              objectFit={mobileScreen ? 'contain' : 'cover'}
            >
              <PreserveButton onClick={handlePreserverArtifact}>
                <Text
                  className="button-text"
                  size="medium"
                  color="bg1"
                  fontWeight="medium"
                >
                  Inscribe now
                </Text>
              </PreserveButton>
            </ArtifactButton>

            <FileUploader
              handleChange={onChangeFile}
              name={'fileUploader'}
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
      <UploadFooter
        handlePreserverArtifact={handlePreserverArtifact}
        onChangeFile={onChangeFile}
        // onSizeError={onSizeError}
        isUploadVisible={isUploadVisible}
      />
    </>
  );
};

export default Artifacts;
