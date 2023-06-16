import Button from '@/components/Button';
import ButtonWrapper from '@/components/ButtonWrapper';
import Empty from '@/components/Empty';
import Spinner from '@/components/Spinner';
import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { getUploadedFileList } from '@/services/file';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import uniqBy from 'lodash/uniqBy';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProcessingItem from '../ProcessingItem';
import { Wrapper } from './ProcessingList.styled';

const FETCH_LIMIT = 10;

const ProcessedList: React.FC = (): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [loadingProcessing, setLoadingProcessing] = useState(true);
  const [hashMoreProcessing, setHasMoreProcessing] = useState(false);
  const [processingFiles, setProcessingFiles] = useState<
    Array<IUploadFileResponseItem>
  >([]);

  const fetchProcessingFileList = async (): Promise<void> => {
    try {
      if (!user || !user.walletAddress) return;
      setLoadingProcessing(true);
      const page = Math.floor(processingFiles.length / FETCH_LIMIT) + 1;
      const processingFilesRes = await getUploadedFileList({
        page: page,
        limit: FETCH_LIMIT,
        wallet_address: user.walletAddress,
        status: '0,1',
      });

      if (processingFilesRes.length < FETCH_LIMIT) {
        setHasMoreProcessing(false);
      } else {
        setHasMoreProcessing(true);
      }

      const newList = uniqBy([...processingFiles, ...processingFilesRes], 'id');
      setProcessingFiles(newList);
    } catch (err: unknown) {
      logger.debug('failed to get process files');
    } finally {
      setLoadingProcessing(false);
    }
  };

  useEffect(() => {
    fetchProcessingFileList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Wrapper>
        <div className="sectionWrapper">
          <h2 className="sectionTitle">Processing</h2>
          <div className="dataList">
            {processingFiles.map((item) => {
              return <ProcessingItem key={item.id} file={item} />;
            })}
          </div>
          {loadingProcessing && (
            <div className="loading-wrapper">
              <Spinner />
            </div>
          )}
          {true && (
            <ButtonWrapper variant="transparent" className="loadmore-wrapper">
              <Button className="loadmore-btn" onClick={fetchProcessingFileList}>
                Load more
              </Button>
            </ButtonWrapper>
          )}
          {!loadingProcessing &&
            !hashMoreProcessing &&
            processingFiles.length === 0 && <Empty infoText="No data found" />}
        </div>
      </Wrapper>
    </>
  );
};

export default ProcessedList;
