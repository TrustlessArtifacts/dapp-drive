import ArtifactButton from '@/components/ArtifactButton';
import FileChunk from '@/components/FileChunk';
import IconSVG from '@/components/IconSVG';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ARTIFACT_CONTRACT, CDN_URL } from '@/configs';
import { FileProcessStatus } from '@/enums/file';
import useStoreChunks, {
  IStoreChunkParams,
} from '@/hooks/contract-operations/artifacts/useStoreChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { updateFileChunkTransactionInfo } from '@/services/file';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';
import { Transaction } from 'ethers';
import React from 'react';
import {
  InfoWrapper,
  StyledProcessingItem,
  ThumbnailOverlay,
  ThumbnailWrapper,
} from './ProcessingItem.styled';

interface IProps {
  file?: IUploadFileResponseItem;
  index?: number;
}

const ProcessingItem: React.FC<IProps> = ({ file, index }: IProps) => {
  const { run: storeChunks } = useContractOperation<IStoreChunkParams, Transaction | null>({
    operation: useStoreChunks,
    inscribeable: true,
  });

  const handleInscribeNextChunk = async () => {
    try {
      // const fileBuffer = await readFileAsBuffer(file?.fullPath);

      const tx = await storeChunks({
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

  if (!file) return null;

  const progress = (file?.processedChunks / file?.totalChunks) * 100;

  const renderContentStatus = (status: number) => {
    switch (status) {
      case FileProcessStatus.New:
        return (
          <div>
            <p className="fileName">{file?.name || 'woman-yelling.png'}</p>
            <FileChunk progress={progress} fileSize={file?.size} />
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
            <p className="fileName">{`Artifact #${file?.tokenId}` || file?.name}</p>
            <FileChunk progress={progress} fileSize={file?.size} />
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
      default:
        return null;
    }
  };

  return (
    <StyledProcessingItem>
      <ThumbnailWrapper className="animationBorder">
        <NFTDisplayBox
          collectionID={ARTIFACT_CONTRACT}
          contentClass="image"
          src={file?.fullPath}
          tokenID={file?.tokenId}
          type={file?.fileType}
        />
        <IconSVG
          src={`${CDN_URL}/icons/bi_clock-history.svg`}
          maxWidth="40"
          className="ic-loading"
        />
        <ThumbnailOverlay
          className="thumbnailOverlay"
          progress={progress}
        ></ThumbnailOverlay>
      </ThumbnailWrapper>
      {file?.status && <InfoWrapper>{renderContentStatus(file.status)}</InfoWrapper>}
    </StyledProcessingItem>
  );
};

export default ProcessingItem;
