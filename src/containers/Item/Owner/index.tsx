import React, { useEffect, useState } from 'react';
import ArtifactButton from '@/components/ArtifactButton';
import Text from '@/components/Text';
import { PreserveButton } from '@/containers/Artifacts/Artifacts.styled';
import { IInscription } from '@/interfaces/api/inscription';
import { Container } from './Owner.styled';
import { FileUploader } from 'react-drag-drop-files';
import ModalOwnerUpload from '../ModalOwnerUpload';
import useAsyncEffect from 'use-async-effect';
import { getUploadedFileList } from '@/services/file';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';

interface IProps {
  inscription?: IInscription;
}

const Owner: React.FC<IProps> = ({ inscription }: IProps) => {
  const user = useSelector(getUserSelector);
  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const onChangeFile = (file: File): void => {
    setFile(file);
  };

  useEffect(() => {
    if (file) {
      setShowUploadModal(true);
    }
  }, [file]);

  useAsyncEffect(async () => {
    setVisible(false);

    if (!inscription || !user) return;

    const processingFilesRes = await getUploadedFileList({
      page: 1,
      limit: 32,
      wallet_address: user.walletAddress,
      token_id: inscription.tokenId,
    });

    if (processingFilesRes.length === 0) {
      setVisible(true);
    }

  }, [inscription, user]);

  if (!inscription || !visible) {
    return <></>;
  }

  return (
    <>
      <Container>
        <div className='owner-wrapper'>
          <p className="owner-description">
            You&apos;re owner of this smart inscription. Look like your smart inscription is empty.
          </p>
          <ArtifactButton
            variant="primary-md"
            width={175}
            height={38}
            objectFit='contain'
            className='upload-btn'
          >
            <PreserveButton>
              <Text
                className="button-text"
                size="medium"
                color="bg1"
                fontWeight="medium"
              >
                Upload now
              </Text>
              <FileUploader
                handleChange={onChangeFile}
                name={'fileUploader'}
                classes={`file-uploader`}
              />
            </PreserveButton>
          </ArtifactButton>
        </div>
      </Container>
      <ModalOwnerUpload
        inscription={inscription}
        show={showUploadModal}
        handleClose={() => {
          setShowUploadModal(false);
          setFile(null);
        }}
        file={file}
        setFile={setFile}
      />
    </>
  )
}

export default Owner;