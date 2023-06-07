import React, { useMemo } from 'react';
import { StyledFileChunk } from './FileChunk.styled';
import { prettyPrintBytes } from '@/utils';
import { IUploadFileResponseItem } from '@/interfaces/api/files';

type Props = {
  file?: IUploadFileResponseItem;
};

const FileChunk = ({ file }: Props) => {
  const fileSize = file?.size || 0;
  const totalChunks = file?.totalChunks ?? 1;
  const finishedChunk = useMemo(() => {
    if (!file) return 0;
    return file.processingChunks + file.processedChunks;
  }, [file])
  const finishedFileSize = file ? finishedChunk * file.chunkSize : 0;


  if (!file) return <></>

  return (
    <StyledFileChunk>
      <div className="chunks">
        {Array.from({ length: totalChunks }, (_, i) => (
          <div className="chunk-block" key={i}>
            <div
              className={`chunk-inner ${i < finishedChunk ? 'active' : ''}`}
            ></div>
          </div>
        ))}
      </div>
      <div className="fileSize">
        {finishedFileSize.toFixed(2)}
        <span> / {prettyPrintBytes(fileSize)}</span>
      </div>
    </StyledFileChunk>
  );
};

export default FileChunk;
