import React from 'react';
import { StyledFileChunk } from './FileChunk.styled';
import { prettyPrintBytes } from '@/utils';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';

type Props = {
  //   totalChunks: number;
  progress: number; // percent done
  fileSize: number;
};

const FileChunk = ({ progress, fileSize }: Props) => {
  const totalChunks = Math.ceil(fileSize / 1024 / (BLOCK_CHAIN_FILE_LIMIT * 1000));

  const finishedChunk = Math.ceil((progress / 100) * totalChunks);

  const finishedFileSize = finishedChunk * BLOCK_CHAIN_FILE_LIMIT;

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
