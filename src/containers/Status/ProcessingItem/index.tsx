import ArtifactButton from '@/components/ArtifactButton';
import FileChunk from '@/components/FileChunk';
import IconSVG from '@/components/IconSVG';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ARTIFACT_CONTRACT, CDN_URL } from '@/configs';
import { ChunkProcessStatus, FileProcessStatus } from '@/enums/file';
import useStoreChunks, {
  IStoreChunkParams,
} from '@/hooks/contract-operations/artifacts/useStoreChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { getFileChunks, updateFileChunkTransactionInfo } from '@/services/file';
import logger from '@/services/logger';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { Transaction } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import {
  InfoWrapper,
  StyledProcessingItem,
  ThumbnailOverlay,
  ThumbnailWrapper,
} from './ProcessingItem.styled';
import MatrixRainAnimation from '@/components/MatrixRainAnimation';
import { Buffer } from 'buffer';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';

interface IProps {
  file?: IUploadFileResponseItem;
}

const ProcessingItem: React.FC<IProps> = ({ file }: IProps) => {
  const { account } = useWeb3React();
  const router = useRouter();
  const matrixContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState<number | null>(null);
  const [divHeight, setDivHeight] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const { run: storeChunks } = useContractOperation<IStoreChunkParams, Transaction | null>({
    operation: useStoreChunks,
    inscribeable: true,
  });

  const handleInscribeNextChunk = async () => {
    try {
      if (!account) {
        router.push(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
        return;
      }

      if (!file) {
        showToastError({
          message: 'File not found',
        });
        return;
      }

      setProcessing(true);
      const { id: fileId } = file;

      // Fetch uninscribed chunks
      const unprocessedChunks = await getFileChunks({
        fileId,
        status: ChunkProcessStatus.New,
      });

      if (!unprocessedChunks.length || processing) {
        return;
      }

      // Get the first chunk to process
      const pickedChunk = unprocessedChunks[0];
      const chunkData = Buffer.from(pickedChunk.chunkData);
      logger.debug('pickedChunk', pickedChunk);

      const tx = await storeChunks({
        tokenId: file.tokenId,
        chunkIndex: pickedChunk.chunkIndex,
        chunks: chunkData,
        txSuccessCallback: async (transaction: Transaction | null) => {
          logger.debug('transaction', transaction);
          logger.debug('fileId in closure', fileId);
          if (!transaction) return;

          // Update tx_hash
          await updateFileChunkTransactionInfo({
            tcAddress: account,
            txHash: Object(transaction).hash,
            fileId,
            chunkId: pickedChunk.id,
          });
        },
      })

      if (!tx) {
        showToastError({
          message: 'Rejected request.',
        });
        return;
      }

      showToastSuccess({
        message:
          'Please go to your wallet to authorize the request for the Bitcoin transaction.',
      });
    } catch (err: unknown) {
      logger.error(err);
      logger.debug('failed to inscribe next file chunk');
      showToastError({
        message: (err as Error).message
      })
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const divElement = matrixContainerRef.current;

    if (divElement) {
      const { width, height } = divElement.getBoundingClientRect();
      setDivWidth(width);
      setDivHeight(height);
    }
  }, []);

  if (!file) return null;

  const progress = (file?.processingChunks / file?.totalChunks) * 100;

  const renderContentStatus = (status: number) => {
    switch (status) {
      case FileProcessStatus.New:
        return (
          <div>
            <p className="fileName">{file?.name || 'woman-yelling.png'}</p>
            <FileChunk file={file} />
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
            <FileChunk file={file} />
            <ArtifactButton
              variant={'primary'}
              className="ctaBtn"
              width={150}
              height={44}
              onClick={handleInscribeNextChunk}
              disabled={processing}
            >
              <p>{processing ? 'Processing...' : 'Inscribe'}</p>
            </ArtifactButton>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <StyledProcessingItem>
      <ThumbnailWrapper className="animationBorder" ref={matrixContainerRef}>
        <MatrixRainAnimation width={divWidth || 0} height={divHeight || 0} />
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
