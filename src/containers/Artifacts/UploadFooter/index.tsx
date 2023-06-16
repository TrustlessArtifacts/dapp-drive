import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { CDN_URL } from '@/configs';
import { FileUploader } from 'react-drag-drop-files';
import { useSelector } from 'react-redux';
import { StyledUploadFooter } from './UploadFooter.styled';

import ButtonWrapper from '@/components/ButtonWrapper';
import { WalletContext } from '@/contexts/wallet-context';
import logger from '@/services/logger';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { showToastError } from '@/utils/toast';
import { useContext, useEffect, useState } from 'react';
import ModalUpload from '../ModalUpload';

type Props = {
  isUploadVisible: boolean;
  style?: React.CSSProperties;
};

const UploadFooter = ({ isUploadVisible, style }: Props) => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { onDisconnect, onConnect, requestBtcAddress } = useContext(WalletContext);

  const [file, setFile] = useState<File | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

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
      <StyledUploadFooter isUploadVisible={isUploadVisible} style={style}>
        <div className="icons">
          <IconSVG
            src={`${CDN_URL}/pages/artifacts/icons/ic-footer-1.svg`}
            maxWidth="40"
          />
          <IconSVG
            src={`${CDN_URL}/pages/artifacts/icons/ic-footer-2.svg`}
            maxWidth="40"
          />
          <IconSVG
            src={`${CDN_URL}/pages/artifacts/icons/ic-footer-3.svg`}
            maxWidth="40"
          />
          <IconSVG
            src={`${CDN_URL}/pages/artifacts/icons/ic-footer-4.svg`}
            maxWidth="40"
          />
        </div>
        <div className="text">
          <span>
            Inscribe smart inscriptions, large file size support with great
            utilities.
          </span>
        </div>
        <div className="button">
          <ButtonWrapper variant="primary">
            <button onClick={handlePreserverArtifact}>
              <Text className="button-text" color="bg1" fontWeight="medium">
                Inscribe now
              </Text>
            </button>
          </ButtonWrapper>

          <FileUploader
            handleChange={onChangeFile}
            name={'fileUploader'}
            classes={`file-uploader ${!isAuthenticated ? 'hidden' : ''}`}
          />
        </div>
      </StyledUploadFooter>
      {showUploadModal && (
        <ModalUpload
          show={showUploadModal}
          handleClose={() => {
            setShowUploadModal(false);
            setFile(null);
          }}
          file={file}
          setFile={setFile}
        />
      )}
    </>
  );
};

export default UploadFooter;
