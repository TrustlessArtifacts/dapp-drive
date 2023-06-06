import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { StyledProcessedItem } from './ProcessedItem.styled';
import BigFileTag from '@/components/BigFileTag';
import { prettyPrintBytes } from '@/utils';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { formatDateTime } from '@/utils/time';
import ArtifactButton from '@/components/ArtifactButton';

type Props = {
  index: number;
  item?: IUploadFileResponseItem;
};

const ProcessedItem = ({ index, item }: Props) => {
  const isBigFile = true;

  return (
    <StyledProcessedItem className="border-gradient">
      <div className="info-wrapper">
        <div className="thumbnail-wrapper">
          <img src={item?.fullPath} alt="" />
        </div>
        <div className="content-wrapper">
          <div className="file-name">
            <p>Artifact #521</p>
            {isBigFile && <BigFileTag />}
          </div>
          <div className="file-info">
            <p className="file-size">
              {item?.size ? prettyPrintBytes(item?.size) : '2 MB'}
            </p>
            <IconSVG
              src={`${CDN_URL}/pages/artifacts/icons/ic-star.svg`}
              maxWidth="10"
            />
            <p className="file-date">
              {item?.createdAt
                ? formatDateTime(item?.createdAt)
                : '2021-07-28 12:00:00'}
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

export default ProcessedItem;
