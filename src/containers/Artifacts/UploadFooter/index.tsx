import ArtifactButton from '@/components/ArtifactButton';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { CDN_URL } from '@/configs';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { FileUploader } from 'react-drag-drop-files';
import { useSelector } from 'react-redux';
import { StyledUploadFooter } from './UploadFooter.styled';

import { getIsAuthenticatedSelector } from '@/state/user/selector';

type Props = {
  handlePreserverArtifact: () => void;
  onChangeFile: (file: File) => void;
  onSizeError: () => void;
  isUploadVisible: boolean;
};

const UploadFooter = ({
  handlePreserverArtifact,
  onChangeFile,
  onSizeError,
  isUploadVisible,
}: Props) => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);

  return (
    <StyledUploadFooter isUploadVisible={isUploadVisible}>
      <div className="icons">
        <IconSVG src={`${CDN_URL}/artifact/icons/ic-footer-1.svg`} maxWidth="40" />
        <IconSVG src={`${CDN_URL}/artifact/icons/ic-footer-2.svg`} maxWidth="40" />
        <IconSVG src={`${CDN_URL}/artifact/icons/ic-footer-3.svg`} maxWidth="40" />
        <IconSVG src={`${CDN_URL}/artifact/icons/ic-footer-4.svg`} maxWidth="40" />
      </div>
      <div className="text">
        <span>Various file extensions of </span>
        <span>any size are supported.</span>
      </div>
      <div className="button">
        <ArtifactButton variant="white" width={226} height={52}>
          <button onClick={handlePreserverArtifact}>
            <Text className="button-text" color="bg1" fontWeight="medium">
              Preserve Artifact
            </Text>
          </button>
        </ArtifactButton>

        <FileUploader
          handleChange={onChangeFile}
          name={'fileUploader'}
          maxSize={BLOCK_CHAIN_FILE_LIMIT}
          onSizeError={onSizeError}
          classes={`file-uploader ${!isAuthenticated ? 'hidden' : ''}`}
        />
      </div>
    </StyledUploadFooter>
  );
};

export default UploadFooter;