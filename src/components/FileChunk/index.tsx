import React from 'react';
import { StyledFileChunk } from './FileChunk.styled';
import { prettyPrintBytes } from '@/utils';
import { IUploadFileResponseItem } from '@/interfaces/api/files';

type Props = {
  file?: IUploadFileResponseItem;
};

const FileChunk = ({ file }: Props) => {
  const fileSize = file?.size || 0;
  const totalChunks = file?.totalChunks ?? 1;
  const finishedChunk = file?.processingChunks ?? 0;
  const finishedFileSize = file ? file.processingChunks * file.chunkSize : 0;

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
