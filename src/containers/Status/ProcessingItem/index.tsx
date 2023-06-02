import { IUploadFileResponseItem } from '@/interfaces/api/files';
import React from 'react';
import {
  ThumbnailWrapper,
  StyledProcessingItem,
  InfoWrapper,
} from './ProcessingItem.styled';
import { CDN_URL } from '@/configs';
import IconSVG from '@/components/IconSVG';
import { FileProcessStatus } from '@/enums/file';
import FileChunk from '@/components/FileChunk';
import ArtifactButton from '@/components/ArtifactButton';
import logger from '@/services/logger';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useStoreChunks from '@/hooks/contract-operations/artifacts/useStoreChunks';
import { Transaction } from 'ethers';
import { IStoreChunkParams } from '@/hooks/contract-operations/artifacts/useStoreChunks';
import { showToastError } from '@/utils/toast';
import { updateFileChunkTransactionInfo } from '@/services/file';

interface IProps {
  file?: IUploadFileResponseItem;
  index: number;
}

const ProcessingItem: React.FC<IProps> = ({ file, index }: IProps) => {
  //TODO: Call contract API to get chunks data
  // updateFileChunkTransactionInfo
  const { run } = useContractOperation<IStoreChunkParams, Transaction | null>({
    operation: useStoreChunks,
  });

  const handleInscribeNextChunk = async () => {
    try {
      // const fileBuffer = await readFileAsBuffer(file?.fullPath);

      const tx = await run({
        tokenId: file?.tokenId,
        chunkIndex: index + 1,
        chunks: [],
      });
      if (!tx) {
        showToastError({
          message: 'Rejected request.',
        });
        return;
      }

      await updateFileChunkTransactionInfo({
        txHash: tx.hash,
        fileId: file?.id,
        chunkId: index + 1,
      });
    } catch (err: unknown) {
      logger.debug('failed to inscribe next file chunk');
      throw Error();
    }
  };

  const renderContentStatus = (status: number) => {
    switch (status) {
      case FileProcessStatus.New:
        return (
          <div>
            <p className="fileName">{file?.name || 'woman-yelling.png'}</p>
            <FileChunk />
            <ArtifactButton variant={'primary'}>
              <p>Waiting for token id</p>
            </ArtifactButton>
          </div>
        );
      case FileProcessStatus.Processing:
        return (
          <div>
            <p className="fileName">{file?.name || 'Confused cat #1'}</p>
            <FileChunk />
            <ArtifactButton variant={'primary'}>
              <button onClick={handleInscribeNextChunk}>inscribe</button>
            </ArtifactButton>
          </div>
        );
    }
  };

  return (
    <StyledProcessingItem>
      <ThumbnailWrapper className="animationBorder">
        <img
          className="thumbnail"
          src={
            file?.fullPath || index === 1
              ? 'https://www.masala.com/cloud/2021/07/28/8DKbhQ8H-SmudgeCat.jpg-1200x675.jpg'
              : 'https://i.kym-cdn.com/photos/images/newsfeed/001/505/717/49b.jpg'
          }
          alt={file?.name || 'thumbnail'}
        />
        <div className="thumbnailOverlay">
          <IconSVG src={`${CDN_URL}/icons/bi_clock-history.svg`} maxWidth="40" />
        </div>
      </ThumbnailWrapper>
      <InfoWrapper>{renderContentStatus(index)}</InfoWrapper>
    </StyledProcessingItem>
  );
};

export default ProcessingItem;
