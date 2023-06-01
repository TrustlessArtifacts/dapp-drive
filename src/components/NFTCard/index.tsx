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

INFTCard) => {
  // const user = useSelector(getUserSelector);
  // const [showTransferModal, setShowTransferModal] = useState(false);

  // title2,
  // title3,
  owner,
}: INFTCard) => {
  // const user = useSelector(getUserSelector);
  // const [showTransferModal, setShowTransferModal] = useState(false);


  // const hanldeOpenTransferModal = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   setShowTransferModal(true);
  // };

  // const hanldeCloseTransferModal = () => {
  //   setShowTransferModal(false);
  // };


  // const isOwner = useMemo(() => {
  //   return (
  //     user?.walletAddress &&
  //     user?.walletAddress?.toLowerCase() === owner?.toLowerCase()
  //   );
  // }, [owner, user]);


  return (
    <>
      <Styled href={href}>
        <div className="card-content">
          <div className="card-image">
            <div className="blur-circle"></div>
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
                  src={`${CDN_URL}/artifact/icons/ic-view.svg`}
                />
              </div>
            </a>
          </div>
          <div className="card-info">
            {title1 && <p className="card-title1">{title1}</p>}
          </div>
          {/* {isOwner && (
            <div className="owner-actions">
              <ArtifactButton variant="white" width={300} height={79}>
                <button onClick={hanldeOpenTransferModal}>Transfer</button>
              </ArtifactButton>
            </div>
          )} */}
        </div>
      </Styled>
      {/* <TransferModal
        show={showTransferModal}
        handleClose={hanldeCloseTransferModal}
        contractAddress={contract}
        tokenId={tokenId}
      /> */}
    </>
  );
};

export default NFTCard;
