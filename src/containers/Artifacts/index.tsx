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
      console.log(err);
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
              <p className="upload_title">Artifacts</p>
              <Text className="upload_desc">
                Cheap. Immutable. Fully on-chain. Large files are supported too. We
                recommend you preserve a small artifact to save gas fees—ideally, a
                file under 20 kB.
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
                  Preserve Artifact
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
