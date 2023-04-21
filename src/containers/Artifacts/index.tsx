import Text from '@/components/Text';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import BFSList from './BFSList';
import {
  UploadFileContainer,
  ArtifactWrapper,
  PreserveButton,
} from './Artifacts.styled';
import ModalUpload from './ModalUpload';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';

const Artifacts: React.FC = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const onSizeError = (): void => {
    toast.error(
      `File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`,
    );
  };

  const handlePreverseArtifact = () => {
    if (!isAuthenticated) router.push(ROUTE_PATH.CONNECT_WALLET);
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
            <h3 className="upload_title">Artifacts</h3>
            <Text size="medium">
              Cheap. Immutable. Fully on-chain. Large files are supported too.
            </Text>
          </div>
        </div>
        <div className="upload_right">
          <PreserveButton onClick={handlePreverseArtifact}>
            <Text
              size="medium"
              color="bg1"
              className="button-text"
              fontWeight="medium"
            >
              Preserve Artifact
            </Text>
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
