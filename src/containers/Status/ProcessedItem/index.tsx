import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { StyledProcessedItem } from './ProcessedItem.styled';
import BigFileTag from '@/components/BigFileTag';
import { prettyPrintBytes } from '@/utils';
import IconSVG from '@/components/IconSVG';
import { ARTIFACT_CONTRACT, CDN_URL } from '@/configs';
import { formatDateTime } from '@/utils/time';
import ArtifactButton from '@/components/ArtifactButton';
import NFTDisplayBox from '@/components/NFTDisplayBox';

interface IProps {
  file?: IUploadFileResponseItem;
};

const Processedfile: React.FC<IProps> = ({ file }: IProps) => {
  const isBigFile = true;

  return (
    <StyledProcessedItem className="border-gradient">
      <div className="info-wrapper">
        <div className="thumbnail-wrapper">
          <NFTDisplayBox
            collectionID={ARTIFACT_CONTRACT}
            contentClass="image"
            src={file?.fullPath}
            tokenID={file?.tokenId}
            type={file?.fileType}
          />
        </div>
        <div className="content-wrapper">
          <div className="file-name">
            <p>Inscription #{file?.tokenId}</p>
            {isBigFile && <BigFileTag />}
          </div>
          <div className="file-info">
            <p className="file-size">
              {file?.size ? prettyPrintBytes(file?.size) : '2 MB'}
            </p>
            <IconSVG
              src={`${CDN_URL}/pages/artifacts/icons/ic-star.svg`}
              maxWidth="10"
            />
            <p className="file-date">
              {formatDateTime({
                dateTime: file?.createdAt || '',
                formatPattern: 'DD MMM YYYY HH:mm'
              })}
            </p>
          </div>
        </div>
      </div>
      <div>
        <ArtifactButton variant="green-transparent" height={40} width={120}>
          <span className="preserved-note">Preserved</span>
        </ArtifactButton>
      </div>
    </StyledProcessedItem>
  );
};

export default Processedfile;
