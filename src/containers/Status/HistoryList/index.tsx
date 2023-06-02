import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { getUploadedFileList } from '@/services/file';
import logger from '@/services/logger';
import { getUserSelector } from '@/state/user/selector';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledHistoryList } from './HistoryList.styled';
import ProcessingItem from '../ProcessingItem';

const HistoryList: React.FC = (): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [_processedFiles, setProcessedFiles] = useState<
    Array<IUploadFileResponseItem>
  >([]);
  const [processingFiles, setProcessingFiles] = useState<
    Array<IUploadFileResponseItem>
  >([]);
  const [page, setPage] = useState(1);

  const fetchFileList = useCallback(async (): Promise<void> => {
    try {
      if (user && user.walletAddress) {
        const [processedFilesRes, processingFilesRes] = await Promise.all([
          getUploadedFileList({
            page: page,
            limit: 32,
            wallet_address: user.walletAddress,
            status: '2',
          }),
          await getUploadedFileList({
            page: page,
            limit: 32,
            wallet_address: user.walletAddress,
            status: '0,1',
          }),
        ]);
        logger.debug('_____processedFilesRes');
        logger.debug(processedFilesRes);
        logger.debug('_____processingFilesRes');
        logger.debug(processingFilesRes);

        setProcessedFiles(processedFilesRes);
        setProcessingFiles(processingFilesRes);
        setPage((prev) => prev + 1);
      }
    } catch (err: unknown) {
      logger.debug('failed to get process files');
      throw Error();
    }
  }, [page, user, setProcessedFiles, setProcessingFiles, setPage]);

  useEffect(() => {
    if (user && user.walletAddress) {
      fetchFileList();
    }
  }, [user, fetchFileList]);

  return (
    <StyledHistoryList>
      <div className="sectionWrapper">
        <h2 className="sectionTitle">Processing</h2>
        <div className="dataList">
          {processingFiles.map((item) => {
            return <ProcessingItem key={item.id} file={item} />;
          })}
        </div>
      </div>
    </StyledHistoryList>
  );
};

export default HistoryList;
