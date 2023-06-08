import NFTCard from '@/components/NFTCard';
import { ARTIFACT_CONTRACT, CDN_URL } from '@/configs';
import { IInscription } from '@/interfaces/api/inscription';
import { getCollectionNfts } from '@/services/nft-explorer';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Grid } from './BFSList.styled';
import Spinner from '@/components/Spinner';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';

const LIMIT_PAGE = 32;

const BFSList = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [inscriptions, setInscriptions] = useState<IInscription[]>([]);

  const [filter, setFilter] = useState<number | null>(null);
  const [isSortLatest, setIsSortLatest] = useState<boolean>(true);

  const FILTER_OPTIONS = [
    {
      id: 1,
      name: 'All',
      value: 'all',
      icon: `${CDN_URL}/pages/artifacts/icons/ic-grid-1.svg`,
    },
    {
      id: 2,
      name: 'Files > 350KB',
      value: 'big',
      icon: `${CDN_URL}/pages/artifacts/icons/ic-big-glow.svg`,
    },
    // {
    //   id: 3,
    //   name: 'Small',
    //   value: 'small',
    //   icon: `${CDN_URL}/pages/artifacts/icons/ic-small-file.svg`,
    // },
  ];

  const fetchInscriptions = async (page = 1, isFetchMore = false) => {
    try {
      setIsFetching(true);

      const query: {
        page: number;
        limit: number;
        owner?: string;
        isShowAll?: boolean;
        isBigFile?: boolean;
        sortBy?: string;
        sort?: number;
      } = {
        page,
        limit: LIMIT_PAGE,
        isShowAll: undefined,
        isBigFile: undefined,
        sortBy: undefined,
        sort: isSortLatest ? -1 : 1,
      };

      switch (filter) {
        case 1:
          query.isShowAll = true;
          break;
        case 2:
          query.isShowAll = undefined;
          query.isBigFile = true;
          break;
        case 3:
          query.isShowAll = undefined;
          query.isBigFile = false;
          break;
        default:
          query.isShowAll = false;
          break;
      }

      const data = await getCollectionNfts({
        contractAddress: ARTIFACT_CONTRACT,
        ...query,
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

  const handleFilter = (id: number) => {
    if (filter === id) {
      setFilter(null);
      return;
    }
    setFilter(id);
  };

  useEffect(() => {
    fetchInscriptions();
  }, [filter, isSortLatest]);

  return (
    <Container>
      {/* <div className="show-all-btn">
        <span>Show all</span>
        <input type="checkbox" onClick={() => setShowAll(!showAll)} />
      </div> */}
      <div className="view-options">
        <div className="filter-options">
          {FILTER_OPTIONS.map((item) => (
            <div
              className={`filter-item ${filter === item.id && 'active'}`}
              key={item.id}
              onClick={() => handleFilter(item.id)}
            >
              <IconSVG src={item.icon} maxWidth="24" maxHeight="24" />
              <Text size="medium" fontWeight="medium">
                {item.name}
              </Text>
            </div>
          ))}
        </div>
        <div className="sort-options" onClick={() => setIsSortLatest(!isSortLatest)}>
          <Text size="small" fontWeight="medium">
            Sort by: {isSortLatest ? 'Latest' : 'Oldest'}
          </Text>
          <IconSVG
            maxHeight="24"
            maxWidth="24"
            className={isSortLatest ? '' : 'rotate-180'}
            src={`${CDN_URL}/pages/artifacts/icons/ic-solar_arrow-right-broken.svg`}
          />
        </div>
      </div>
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
              inscriptions.map((item) => {
                return (
                  <NFTCard
                    key={`token-${item.tokenId}`}
                    href={`/${item.tokenId}`}
                    image={item.image}
                    contract={ARTIFACT_CONTRACT}
                    tokenId={item.tokenId}
                    contentType={item.contentType}
                    title1={`Smart Inscription #${item.tokenId}`}
                    fileSize={item?.size}
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
