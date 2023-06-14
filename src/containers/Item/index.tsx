import IconSVG from '@/components/IconSVG';
import MatrixRainAnimation from '@/components/MatrixRainAnimation';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import Spinner from '@/components/Spinner';
import { ARTIFACT_CONTRACT, CDN_URL } from '@/configs';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
import { IInscription } from '@/interfaces/api/inscription';
import logger from '@/services/logger';
import { getNFTDetail, refreshMetadata } from '@/services/nft-explorer';
import { getUserSelector } from '@/state/user/selector';
import px2rem from '@/utils/px2rem';
import { formatTimeStamp } from '@/utils/time';
import { prettyPrintBytes } from '@/utils/units';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import UploadFooter from '../Artifacts/UploadFooter';
import BigFileBlock from './../../components/BigFileBlock/index';
import { Container, Information } from './Inscription.styled';
import Owner from './Owner';

interface IProps {
  data?: IInscription;
}

const Inscription: React.FC<IProps> = ({ data }: IProps) => {
  const router = useRouter();
  const user = useSelector(getUserSelector);
  const matrixContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState<number | null>(null);
  const { tokenId } = router.query as { tokenId: string };
  const [inscription, setInscription] = useState<IInscription | undefined>(data);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

  useEffect(() => {
    if (!data) {
      fetchInscriptionDetail();
    }
  }, [data]);

  useEffect(() => {
    const divElement = matrixContainerRef.current;

    if (divElement) {
      const { width } = divElement.getBoundingClientRect();
      setDivWidth(width);
    }
  }, [inscription]);

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

  const renderProperties = (
    attributes: Array<{
      traitType: string;
      value: string;
    }>,
  ) => (
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
    return (
      <div className="grid-center h-full-view">
        <Spinner></Spinner>;
      </div>
    );
  }

  return (
    <Container>
      <UploadFooter
        isUploadVisible={false}
        style={{
          position: 'relative',
          backgroundColor: 'transparent',
          padding: `${px2rem(24)} 0 `,
        }}
      />
      <div className="content">
        <div className="left-container">
          {inscription && !inscription.fileSize && (
            <div
              className="empty-content-wrapper animationBorder"
              ref={matrixContainerRef}
            >
              <MatrixRainAnimation width={divWidth || 0} height={250} />
              <p className="empty-text">No data found</p>
            </div>
          )}
          {inscription && !!inscription.fileSize && (
            <NFTDisplayBox
              className="thumbnail-container"
              collectionID={inscription?.collectionAddress}
              contentClass="thumbnail"
              src={inscription.image}
              tokenID={inscription?.tokenId}
              type={inscription?.contentType}
            />
          )}

          {user?.walletAddress?.toLowerCase() ===
            inscription?.owner?.toLowerCase() &&
            !inscription.contentType && <Owner inscription={inscription} />}
        </div>
        <div className="right-container">
          {inscription &&
          inscription.fileSize &&
          inscription?.fileSize > BLOCK_CHAIN_FILE_LIMIT ? (
            <BigFileBlock>
              <p>
                This file is greater than 350KB. The current largest file inscribed
                on <span> Smart Inscriptions </span> is <span> 6.9MB </span>. <br />{' '}
                On <span> Smart Inscriptions</span>, you can now inscribe with no
                storage restrictions.
              </p>
            </BigFileBlock>
          ) : (
            <></>
          )}

          <div className="inscription-wrapper">
            <div className="">
              <div className="header">
                <p className="title">Smart Inscription #{inscription?.tokenId}</p>
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
                <Spinner />
                <p>
                  Updating… <br />
                  <br />
                  Anticipate a waiting period of 5 minutes or longer, contingent upon
                  network conditions.
                </p>
              </div>
            </div>
            <div className="list">
              {inscription && !!inscription.fileSize ? (
                renderListItem(
                  'File size',
                  `${prettyPrintBytes(inscription.fileSize)}`,
                )
              ) : (
                <></>
              )}
              {inscription?.owner && renderListItem('Owner', inscription?.owner)}

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
