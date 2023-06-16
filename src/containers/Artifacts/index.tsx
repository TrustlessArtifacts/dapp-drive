import ButtonWrapper from '@/components/ButtonWrapper';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet-context';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import logger from '@/services/logger';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { showToastError } from '@/utils/toast';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useSelector } from 'react-redux';
import {
  ArtifactWrapper,
  PreserveButton,
  UploadFileContainer,
} from './Artifacts.styled';
import BFSList from './BFSList';
import ModalUpload from './ModalUpload';
import UploadFooter from './UploadFooter';

const Artifacts: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } = useContext(WalletContext);

  const uploadRef = useRef<HTMLDivElement>(null);

  const isUploadVisible = useIsInViewport(uploadRef, { threshold: 0.2 });

  const handleConnectWallet = async () => {
    try {
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      logger.error(err);
      showToastError({
        message: (err as Error).message,
      });
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
                Inscribe smart inscriptions, large file size support with great
                utilities.
              </Text>
            </div>
          </div>
          <div className="upload_right" ref={uploadRef}>
            <ButtonWrapper variant="primary">
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
            </ButtonWrapper>
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
      <UploadFooter isUploadVisible={isUploadVisible} />
    </>
  );
};

export default Artifacts;
