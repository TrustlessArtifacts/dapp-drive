import { IInscription } from '@/interfaces/api/inscription';
import { getNFTDetail } from '@/services/nft-explorer';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Container, Information } from './Inscription.styled';
import { ARTIFACT_CONTRACT, BIG_FILE_PROJECT_ID } from '@/configs';
import { formatTimeStamp } from '@/utils/time';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';
import NFTDisplayBox from '@/components/NFTDisplayBox';

const Inscription = () => {
  const router = useRouter();
  const { contract, id } = queryString.parse(location.search) as {
    contract: string;
    id: string;
  };
  const [inscription, setInscription] = useState<IInscription | undefined>();

  useEffect(() => {
    fetchInscriptionDetail();
  }, []);

  const fetchInscriptionDetail = async () => {
    try {
      const data = await getNFTDetail({ contractAddress: contract, tokenId: id });
      setInscription(data);
    } catch (error) {
      router.push(ROUTE_PATH.NOT_FOUND);
    }
  };

  const renderListItem = (title: string, desc?: string, link?: string) => {
    return (
      <div className="item">
        <p className="name">{title}</p>
        {link ? (
          <a className="link" href={link}>
            {desc}
          </a>
        ) : (
          <p className="desc">{desc}</p>
        )}
      </div>
    );
  };

  if (!inscription) {
    return <></>;
  }

  return (
    <Container>
      <div className="content">
        <div className="left-container">
          <div className="blur-circle"></div>
          {inscription && (
            <NFTDisplayBox
              collectionID={inscription?.collectionAddress}
              contentClass="thumbnail"
              src={inscription.image}
              tokenID={inscription?.tokenId}
              type={inscription?.contentType}
            />
          )}
        </div>
        <div className="right-container">
          <div className="header">
            <p className="title">
              {contract.toLocaleLowerCase() === ARTIFACT_CONTRACT.toLocaleLowerCase()
                ? `Artifact #${inscription?.tokenId}`
                : inscription?.name}
            </p>
          </div>

          <Information>
            <div className="list">
              {renderListItem('Owner', inscription?.owner)}
              {renderListItem('Contract', inscription?.collectionAddress)}
              {renderListItem('Content type', inscription?.contentType)}
              {inscription?.mintedAt &&
                renderListItem(
                  'Timestamp',
                  formatTimeStamp(inscription?.mintedAt * 1000),
                )}
              {inscription?.tokenId === BIG_FILE_PROJECT_ID &&
                renderListItem('File size', '6.9MB')}
            </div>
          </Information>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(Inscription);
