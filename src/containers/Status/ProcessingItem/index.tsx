import { IUploadFileResponseItem } from '@/interfaces/api/files';
import React from 'react';
import {
  ThumbnailWrapper,
  StyledProcessingItem,
  InfoWrapper,
  ThumbnailOverlay,
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
  index?: number;
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

  const MOCK_PROGRESS = 50;

  const renderContentStatus = (status: number) => {
    switch (status) {
      case FileProcessStatus.New:
        return (
          <div>
            <p className="fileName">{file?.name || 'woman-yelling.png'}</p>
            <FileChunk progress={0} fileSize={2048 * 1000} />
            <ArtifactButton
              variant={'primary-transparent'}
              className="ctaBtn"
              width={209}
              height={44}
            >
              <p className={'text-pending'}>Waiting for token id</p>
            </ArtifactButton>
          </div>
        );
      case FileProcessStatus.Processing:
        return (
          <div>
            <p className="fileName">{file?.name || 'Confused cat #1'}</p>
            <FileChunk progress={MOCK_PROGRESS} fileSize={5000 * 1000} />
            <ArtifactButton
              variant={'primary'}
              className="ctaBtn"
              width={150}
              height={44}
            >
              <p onClick={handleInscribeNextChunk}>inscribe</p>
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
        <IconSVG
          src={`${CDN_URL}/icons/bi_clock-history.svg`}
          maxWidth="40"
          className="ic-loading"
        />
        <ThumbnailOverlay
          className="thumbnailOverlay"
          progress={MOCK_PROGRESS}
        ></ThumbnailOverlay>
      </ThumbnailWrapper>
      <InfoWrapper>{renderContentStatus(index)}</InfoWrapper>
    </StyledProcessingItem>
  );
};

export default ProcessingItem;
