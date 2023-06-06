import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { getUploadedFileList } from '@/services/file';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import uniqBy from 'lodash/uniqBy';
import { Wrapper } from './ProcessedList.styled';
import ProcessedItem from '../ProcessedItem';
import Button from '@/components/Button';
import { Spinner } from 'react-bootstrap';

const FETCH_LIMIT = 32;

const ProcessedList: React.FC = (): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [processedFiles, setProcessedFiles] = useState<
    Array<IUploadFileResponseItem>
  >([]);
  const [loadingProcessed, setLoadingProcessed] = useState(false);
  const [hashMoreProcessed, setHasMoreProcessed] = useState(false);

  const fetchProcessedFileList = async (): Promise<void> => {
    try {
      if (!user || !user.walletAddress) return;
      setLoadingProcessed(true)
      const page = Math.floor(processedFiles.length / FETCH_LIMIT) + 1;
      const processedFilesRes = await getUploadedFileList({
        page: page,
        limit: FETCH_LIMIT,
        wallet_address: user.walletAddress,
        status: '2',
      });
      if (processedFilesRes.length < FETCH_LIMIT) {
        setHasMoreProcessed(false);
      } else {
        setHasMoreProcessed(true);
      }

      const newList = uniqBy([...processedFiles, ...processedFilesRes], 'id')
      setProcessedFiles(newList);
    } catch (err: unknown) {
      logger.error('Failed to get processed files');
    } finally {
      setLoadingProcessed(false);
    }
  };

  useEffect(() => {
    fetchProcessedFileList();
  }, [user]);

  return (
    <Wrapper>
      <div className="sectionWrapper">
        <h2 className="sectionTitle">Preserved</h2>
        <div className="list">
          {processedFiles.map((item) => {
            return <ProcessedItem key={item.id} file={item} />;
          })}
        </div>
        {loadingProcessed && (
          <div className="loading-wrapper">
            <Spinner />
          </div>
        )}
        {hashMoreProcessed && (
          <div className="loadmore-wrapper">
            <Button className='loadmore-btn' onClick={fetchProcessedFileList}>
              Load more
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default ProcessedList;
