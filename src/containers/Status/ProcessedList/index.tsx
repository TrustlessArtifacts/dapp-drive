import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { getUploadedFileList } from '@/services/file';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import uniqBy from 'lodash/uniqBy';
import { Wrapper } from './ProcessedList.styled';
import ProcessedItem from '../ProcessedItem';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'lodash';

const FETCH_LIMIT = 32;

const ProcessedList: React.FC = (): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [processedFiles, setProcessedFiles] = useState<
    Array<IUploadFileResponseItem>
  >([]);
  const [loadingProcessed, setLoadingProcessed] = useState(false);

  const fetchProcessedFileList = async (page: number): Promise<void> => {
    try {
      if (!user || !user.walletAddress) return;
      setLoadingProcessed(true);
      const processedFilesRes = await getUploadedFileList({
        page: page,
        limit: FETCH_LIMIT,
        wallet_address: user.walletAddress,
        status: '2',
      });

      const newList = uniqBy([...processedFiles, ...processedFilesRes], 'id');
      setProcessedFiles(newList);
    } catch (err: unknown) {
      logger.error('Failed to get processed files');
    } finally {
      setLoadingProcessed(false);
    }
  };

  const onLoadMoreProcessedFile = () => {
    if (loadingProcessed || processedFiles.length % FETCH_LIMIT !== 0) return;
    const page = Math.floor(processedFiles.length / FETCH_LIMIT) + 1;
    fetchProcessedFileList(page);
  };

  const debounceLoadMore = debounce(onLoadMoreProcessedFile, 300);

  useEffect(() => {
    fetchProcessedFileList(1);
  }, [user]);

  return (
    <Wrapper>
      <div className="sectionWrapper">
        <h2 className="sectionTitle">Preserved</h2>
        <InfiniteScroll
          className="list"
          dataLength={processedFiles?.length || 0}
          hasMore={true}
          loader={
            loadingProcessed && (
              <div className="loading">
                <Spinner animation="border" variant="primary" />
              </div>
            )
          }
          next={debounceLoadMore}
        >
          {processedFiles.map((item) => {
            return <ProcessedItem key={item.id} file={item} />;
          })}
        </InfiniteScroll>
      </div>
    </Wrapper>
  );
};

export default ProcessedList;
