import ArtifactButton from '@/components/ArtifactButton';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { CDN_URL } from '@/configs';
import { FileUploader } from 'react-drag-drop-files';
import { useSelector } from 'react-redux';
import { StyledUploadFooter } from './UploadFooter.styled';

import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { useWindowSize } from '@trustless-computer/dapp-core';
import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '@/contexts/wallet-context';
import { showToastError } from '@/utils/toast';
import logger from '@/services/logger';
import ModalUpload from '../ModalUpload';

type Props = {
  isUploadVisible: boolean;
  style?: React.CSSProperties;
};

const UploadFooter = ({ isUploadVisible, style }: Props) => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { mobileScreen } = useWindowSize();
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

  const buttonWidth = (): number => {
    if (mobileScreen) {
      return 274;
    } else if (window.innerWidth > 1920) {
      return 229;
    } else {
      return 175;
    }
  };

  const buttonHeight = (): number => {
    if (mobileScreen) {
      return 55;
    } else if (window.innerWidth > 1920) {
      return 52;
    } else {
      return 38;
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
          <ArtifactButton
            variant="primary-md"
            width={buttonWidth()}
            height={buttonHeight()}
          >
            <button onClick={handlePreserverArtifact}>
              <Text className="button-text" color="bg1" fontWeight="medium">
                Inscribe now
              </Text>
            </button>
          </ArtifactButton>

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
