import BigFileTag from '@/components/BigFileTag';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
import { IInscription } from '@/interfaces/api/inscription';
import { getNFTDetail } from '@/services/nft-explorer';
import { formatTimeStamp } from '@/utils/time';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Container, Information } from './Inscription.styled';

const Inscription = ({ data }: { data?: IInscription }) => {
  const router = useRouter();
  const { contract, id } = queryString.parse(location.search) as {
    contract: string;
    id: string;
  };
  const [inscription, setInscription] = useState<IInscription | undefined>(data);

  useEffect(() => {
    if (!data) {
      fetchInscriptionDetail();
    }
  }, [data]);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderProperties = (attributes: any[]) => (
    <div className="list-container">
      <p className="list-name">Attributes</p>
      <div className="attribute-list">
        {attributes.length > 0 &&
          attributes.map((trait, index) => {
            return (
              <div key={index.toString()} className="properties-item">
                <p className="properties-trait-type">{trait.traitType}</p>
                <p className="properties-trait-value">{trait.value}</p>
              </div>
            );
          })}
      </div>
    </div>
  );

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
              className="thumbnail-container"
              collectionID={inscription?.collectionAddress}
              contentClass="thumbnail"
              src={inscription.image}
              tokenID={inscription?.tokenId}
              type={inscription?.contentType}
            />
          )}
        </div>
        <div className="right-container">
          {inscription &&
            inscription.fileSize &&
            inscription?.fileSize > BLOCK_CHAIN_FILE_LIMIT * 1024 * 1024 ? (
            <BigFileTag color="green" />
          ) : (
            <></>
          )}
          <div className="header">
            <p className="title">Inscription #{inscription?.tokenId}</p>
          </div>

          <Information>
            <div className="list">
              {inscription && inscription.fileSize ? (
                renderListItem('File size', `${inscription.fileSize} B`)
              ) : (
                <></>
              )}
              {inscription?.owner && renderListItem('Owner', inscription?.owner)}

              {renderListItem('Contract', inscription?.collectionAddress)}

              {inscription?.contentType &&
                renderListItem('Content type', inscription?.contentType)}
              {inscription?.mintedAt &&
                renderListItem(
                  'Timestamp',
                  formatTimeStamp(inscription?.mintedAt * 1000),
                )}
              {inscription &&
                inscription.attributes &&
                inscription.attributes.length > 0 &&
                renderProperties(
                  inscription.attributes.sort(function (a, b) {
                    if (a.traitType < b.traitType) {
                      return -1;
                    }
                    if (a.traitType > b.traitType) {
                      return 1;
                    }
                    return 0;
                  }),
                )}
            </div>
          </Information>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(Inscription);
