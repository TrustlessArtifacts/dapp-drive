import { IUploadFileResponseItem } from "@/interfaces/api/files";
import { getUploadedFileList } from "@/services/file";
import logger from "@/services/logger";
import { getUserSelector } from "@/state/user/selector";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "./HistoryList.styled";
import ProcessingItem from "../ProcessingItem";

const HistoryList: React.FC = (): React.ReactElement => {
  const user = useSelector(getUserSelector);
  const [processedFiles, setProcessedFiles] = useState<Array<IUploadFileResponseItem>>([]);
  const [processingFiles, setProcessingFiles] = useState<Array<IUploadFileResponseItem>>([]);
  const [page, setPage] = useState(1);

  const fetchFileList = useCallback(async (): Promise<void> => {
    const [processedFilesRes, processingFilesRes] = await Promise.all([
      getUploadedFileList({
        page: page,
        limit: 32,
        // wallet_address: user.tcAddress,
        status: '2',
      }),
      await getUploadedFileList({
        page: page,
        limit: 32,
        // wallet_address: user.tcAddress,
        status: '0,1',
      })
    ]);
    logger.debug('_____processedFilesRes')
    logger.debug(processedFilesRes)
    logger.debug('_____processingFilesRes')
    logger.debug(processingFilesRes)

    setProcessedFiles(processedFilesRes);
    setProcessingFiles(processingFilesRes);
  }, [page, user, setProcessedFiles, setProcessingFiles, setPage,]);

  useEffect(() => {
    if (user.tcAddress) {
      fetchFileList();
    }
  }, [user]);

  return (
    <Wrapper>
      <div className="sectionWrapper">
        <h2 className="sectionTitle">
          Processing
        </h2>
        <div className="dataList">
          {processingFiles.map((item) => {
            return (
              <ProcessingItem file={item} />
            )
          })}
        </div>
      </div>
    </Wrapper>
  );
}

export default HistoryList;
