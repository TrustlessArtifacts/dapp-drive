import Button from '@/components/Button';
import Text from '@/components/Text';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import BFSList from './BFSList';
import { UploadFileContainer, ArtifactWrapper } from './Artifacts.styled';
import ModalUpload from './ModalUpload';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import toast from 'react-hot-toast';

const Artifacts: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  const onSizeError = (): void => {
    toast.error(`File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}kb.`);
  };

  const handlePreverseArtifact = () => {
    setShowUploadModal(true)
  }

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
            <Text size="medium">Cheap. Immutable. Fully on-chain. Large files are supported too.</Text>
          </div>
        </div>
        <div className="upload_right">
          <Button
            bg={'white'}
            background={'linear-gradient(90deg, #ff8008 0%, #ffc837 100%)'}
            onClick={handlePreverseArtifact}
          >
            <Text size="medium" color="bg1" className="button-text" fontWeight="medium">
              Preserve Artifact
            </Text>
          </Button>
          <FileUploader
            handleChange={onChangeFile}
            name={'fileUploader'}
            maxSize={BLOCK_CHAIN_FILE_LIMIT}
            onSizeError={onSizeError}
            classes={'file-uploader'}
          />
        </div>
      </UploadFileContainer>
      <BFSList />
      <ModalUpload show={showUploadModal} handleClose={() => setShowUploadModal(false)} file={file} setFile={setFile} />
    </ArtifactWrapper>
  );
};

export default Artifacts;
