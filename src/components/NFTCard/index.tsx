import { useSelector } from 'react-redux';
import NFTDisplayBox from '../NFTDisplayBox';
import { IMAGE_TYPE } from '../NFTDisplayBox/constant';
import { Styled } from './NFTCard.styled';
import { getUserSelector } from '@/state/user/selector';
import React, { useMemo, useState } from 'react';
import TransferModal from './TransferModal';

export interface INFTCard {
  href: string;
  image?: string;
  thumbnail?: string;
  contract?: string;
  tokenId?: string;
  contentType?: IMAGE_TYPE;
  artifactID?: string;
  owner?: string;
  type?: string;
}

const NFTCard = ({
  href,
  image,
  thumbnail,
  contract,
  tokenId,
  contentType,
  artifactID,
  owner,
  type,
}: INFTCard) => {
  const user = useSelector(getUserSelector);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const handleOpenTransferModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setShowTransferModal(true);
  };

  const handleCloseTransferModal = () => {
    setShowTransferModal(false);
  };

  const isOwner = useMemo(() => {
    return (
      user?.tcAddress && user?.tcAddress?.toLowerCase() === owner?.toLowerCase()
    );
  }, [owner, user]);

  return (
    <>
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
            <a className="overlay" href={href} />
          </div>
          <div className="card-info">
            {artifactID && <p className="card-title1">{artifactID}</p>}
            {owner && <p className="card-title2">{owner}</p>}
            {type && <p className="card-title3">{type}</p>}
          </div>
          {isOwner && (
            <div className="owner-actions">
              <button
                onClick={handleOpenTransferModal}
                className="transfer-button"
              >
                Transfer
              </button>
            </div>
          )}
        </div>
      </Styled>
      <TransferModal
        show={showTransferModal}
        handleClose={handleCloseTransferModal}
        contractAddress={contract}
        tokenId={tokenId}
      />
    </>
  );
};

export default NFTCard;
