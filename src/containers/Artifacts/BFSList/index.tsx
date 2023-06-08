import NFTCard from '@/components/NFTCard';
import { ARTIFACT_CONTRACT } from '@/configs';
import { IInscription } from '@/interfaces/api/inscription';
import { getCollectionNfts } from '@/services/nft-explorer';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Grid } from './BFSList.styled';
import Spinner from '@/components/Spinner';

const LIMIT_PAGE = 32;

const BFSList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [inscriptions, setInscriptions] = useState<IInscription[]>([]);
  // const [showAll, setShowAll] = useState(false);

  const fetchInscriptions = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);
      const data = await getCollectionNfts({
        contractAddress: ARTIFACT_CONTRACT,
        limit: LIMIT_PAGE,
        page: page,
        isShowAll: false,
      });

      if (isFetchMore) {
        setInscriptions((prev) => [...prev, ...data]);
      } else {
        setInscriptions(data);
      }
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  const onLoadMoreNfts = () => {
    if (isFetching || inscriptions.length % LIMIT_PAGE !== 0) return;
    const page = Math.floor(inscriptions.length / LIMIT_PAGE) + 1;
    fetchInscriptions(page, true);
  };

  const debounceLoadMore = debounce(onLoadMoreNfts, 300);

  useEffect(() => {
    fetchInscriptions();
  }, []);

  return (
    <Container>
      {/* <div className="show-all-btn">
        <span>Show all</span>
        <input type="checkbox" onClick={() => setShowAll(!showAll)} />
      </div> */}
      <div className="content">
        <InfiniteScroll
          className="list"
          dataLength={inscriptions?.length || 0}
          hasMore={true}
          loader={
            isFetching && (
              <div className="loading">
                <Spinner />
              </div>
            )
          }
          next={debounceLoadMore}
        >
          <Grid>
            {inscriptions &&
              inscriptions.length > 0 &&
              inscriptions.map((item, index) => {
                return (
                  <NFTCard
                    key={index.toString()}
                    href={`/${item.tokenId}`}
                    image={item.image}
                    contract={ARTIFACT_CONTRACT}
                    tokenId={item.tokenId}
                    contentType={item.contentType}
                    title1={`Smart Inscription #${item.tokenId}`}
                  />
                );
              })}
          </Grid>
        </InfiniteScroll>
      </div>
    </Container>
  );
};

export default React.memo(BFSList);
