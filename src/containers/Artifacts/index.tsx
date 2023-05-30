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
import { showToastError } from '@/utils/toast';
import { WalletContext } from '@/contexts/wallet-context';
import logger from '@/services/logger';
import ArtifactButton from '@/components/ArtifactButton';
import useWindowSize from '@/hooks/useWindowSize';

const Artifacts: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { disconnect, connect } = useContext(WalletContext);
  const { mobileScreen } = useWindowSize();

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (err) {
      logger.error(err);
      disconnect();
    }
  };

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const onSizeError = (): void => {
    showToastError({
      message: `File size error, maximum file size is ${
        BLOCK_CHAIN_FILE_LIMIT * 1000
      }kb.`,
    });
  };

  const handlePreserverArtifact = () => {
    if (!isAuthenticated) handleConnectWallet();
    else {
      setShowUploadModal(true);
    }
  };

  useEffect(() => {
    if (file) {
      setShowUploadModal(true);
    } else {
      setShowUploadModal(false);
    }
  }, [file]);

  return (
    <ArtifactWrapper>
      <UploadFileContainer>
        <div className="upload_left">
          <div className="upload_content">
            <p className="upload_title">Artifacts</p>
            <Text size="medium" className="upload_desc">
              Cheap. Immutable. Fully on-chain. Large files are supported too. We
              recommend you preserve a small artifact to save gas fees—ideally, a
              file under 20 kB.
            </Text>
          </div>
        </div>
        <div className="upload_right">
          <ArtifactButton
            variant="primary"
            width={257}
            height={62}
            objectFit={mobileScreen ? 'contain' : 'cover'}
          >
            <PreserveButton onClick={handlePreserverArtifact}>
              <Text
                className="button-text"
                size="medium"
                color="bg1"
                fontWeight="medium"
              >
                Preserve Artifact
              </Text>
            </PreserveButton>
          </ArtifactButton>

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
