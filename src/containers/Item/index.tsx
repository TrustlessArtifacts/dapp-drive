import IconSVG from '@/components/IconSVG';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ARTIFACT_CONTRACT, CDN_URL } from '@/configs';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
import { IInscription } from '@/interfaces/api/inscription';
import logger from '@/services/logger';
import { getNFTDetail, refreshMetadata } from '@/services/nft-explorer';
import { formatTimeStamp } from '@/utils/time';
import { prettyPrintBytes } from '@/utils/units';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Information } from './Inscription.styled';

const Inscription = ({ data }: { data?: IInscription }) => {
  const router = useRouter();
  const { tokenId } = router.query as {
    tokenId: string;
  };
  const [inscription, setInscription] = useState<IInscription | undefined>(data);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  useEffect(() => {
    if (!data) {
      fetchInscriptionDetail();
    }
  }, [data]);

  const fetchInscriptionDetail = async () => {
    try {
      const data = await getNFTDetail({
        contractAddress: ARTIFACT_CONTRACT,
        tokenId: tokenId,
      });
      setInscription(data);
    } catch (error) {
      logger.error(error);
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

  const handleRefreshMetadata = async () => {
    try {
      if (!inscription) return;

      setLoadingRefresh(true);
      await refreshMetadata(ARTIFACT_CONTRACT, inscription.tokenId);
    } catch (err: unknown) {
      logger.debug('Failed to refresh metadata');
    } finally {
      setTimeout(() => {
        setLoadingRefresh(false);
      }, 2000);
    }
  };

  if (!inscription) {
    return <></>;
  }

  return (
    <Container>
      <div className="content">
        <div className="left-container">
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
          inscription?.fileSize > BLOCK_CHAIN_FILE_LIMIT ? (
            // <BigFileTag color="green" />
            <div className="big-file-wrapper">
              <div className="big-file">
                <IconSVG
                  src={`${CDN_URL}/pages/artifacts/icons/ic-big-file.svg`}
                  maxWidth="20"
                  maxHeight="20"
                  className="icon"
                />
                Big File
              </div>
              <p>
                This file is greater than 350KB. The current largest file inscribed
                on <span> Smart Inscriptions </span> is <span> 6.9MB </span>. <br />{' '}
                On <span> Smart Inscriptions</span>, you can now inscribe with no
                storage restrictions.
              </p>
            </div>
          ) : (
            <></>
          )}
          <div className="inscription-wrapper">
            <div className="">
              <div className="header">
                <p className="title">Inscription #{inscription?.tokenId}</p>
              </div>
            </div>
            <div
              className="refresh-btn"
              onClick={handleRefreshMetadata}
              title="Refresh Metadata"
            >
              <IconSVG
                src={`${CDN_URL}/pages/artifacts/icons/ic-refresh.svg`}
                maxWidth={'36'}
              ></IconSVG>
            </div>
          </div>
          <Information loading={loadingRefresh}>
            <div className="loading">
              <div className="loading-inner">
                <div className="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <p>
                  Updating… <br />
                  <br />
                  Anticipate a waiting period of 5 minutes or longer, contingent upon
                  network conditions.
                </p>
              </div>
            </div>
            <div className="list">
              {inscription && inscription.fileSize ? (
                renderListItem(
                  'File size',
                  `${prettyPrintBytes(inscription.fileSize)}`,
                )
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
