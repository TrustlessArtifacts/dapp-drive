import { CDN_URL } from '@/configs';
import IconSVG from '../IconSVG';
import NFTDisplayBox from '../NFTDisplayBox';
import { IMAGE_TYPE } from '../NFTDisplayBox/constant';
import { Styled } from './NFTCard.styled';

export interface INFTCard {
  href: string;
  image?: string;
  thumbnail?: string;
  contract?: string;
  tokenId?: string;
  contentType?: IMAGE_TYPE;
  title1?: string;
}

const NFTCard = ({
  href,
  image,
  thumbnail,
  contract,
  tokenId,
  contentType,
  title1,
}: INFTCard) => {
  return (
    <Styled href={href}>
      <div className="card-content">
        <div className="card-image">
          <NFTDisplayBox
            collectionID={contract}
            contentClass="image"
            thumbnail={thumbnail}
            src={image}
            tokenID={tokenId}
            type={contentType}
          />
          <a className="overlay" href={href}>
            <div className="overlay-content">
              <IconSVG
                maxWidth="100"
                src={`${CDN_URL}/pages/artifacts/icons/ic-view.svg`}
              />
            </div>
          </a>
        </div>
        <div className="card-info">
          {title1 && <p className="card-title1">{title1}</p>}
        </div>
      </div>
    </Styled>
  );
};

export default NFTCard;
