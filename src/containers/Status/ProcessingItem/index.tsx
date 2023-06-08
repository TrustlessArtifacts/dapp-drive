import ArtifactButton from '@/components/ArtifactButton';
import FileChunk from '@/components/FileChunk';
import IconSVG from '@/components/IconSVG';
import MatrixRainAnimation from '@/components/MatrixRainAnimation';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import { ARTIFACT_CONTRACT, CDN_URL } from '@/configs';
import { FileProcessStatus } from '@/enums/file';
import { IUploadFileResponseItem } from '@/interfaces/api/files';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ModalInscribeChunk from '../ModalInscribeChunk';
import {
  InfoWrapper,
  StyledProcessingItem,
  ThumbnailOverlay,
  ThumbnailWrapper,
} from './ProcessingItem.styled';

interface IProps {
  file?: IUploadFileResponseItem;
}

const ProcessingItem: React.FC<IProps> = ({ file }: IProps) => {
  const router = useRouter();
  const matrixContainerRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState<number | null>(null);
  const [showInscribeModal, setShowInscribeModal] = useState(false);

  const [divHeight, setDivHeight] = useState<number | null>(null);

  const finishedChunk = useMemo(() => {
    if (!file) return 0;
    return file.processingChunks + file.processedChunks;
  }, [file]);

  const navigateToDetail = (): void => {
    if (!file) return;
    router.push(`/${file.tokenId}`);
  };

  // const handleInscribeNextChunk = async (
  //   evt: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   evt.stopPropagation();

  //   try {
  //     if (!account) {
  //       router.push(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
  //       return;
  //     }

  //     if (!file) {
  //       showToastError({
  //         message: 'File not found',
  //       });
  //       return;
  //     }

  //     setProcessing(true);
  //     const { id: fileId } = file;

  //     // Fetch uninscribed chunks
  //     const unprocessedChunks = await getFileChunks({
  //       fileId,
  //       status: ChunkProcessStatus.New,
  //     });

  //     logger.debug('unprocessedChunks', unprocessedChunks);

  //     if (!unprocessedChunks.length || processing) {
  //       return;
  //     }

  //     // Get the first chunk to process
  //     const pickedChunk = unprocessedChunks[0];
  //     const decodedChunkData = window.atob(pickedChunk.chunkData);
  //     const chunkData = Buffer.from(decodedChunkData);

  //     logger.debug('pickedChunk', pickedChunk);
  //     logger.debug('decodedChunkData', decodedChunkData);

  //     const tx = await storeChunks({
  //       tokenId: file.tokenId,
  //       chunkIndex: pickedChunk.chunkIndex,
  //       chunks: chunkData,
  //       txSuccessCallback: async (transaction: Transaction | null) => {
  //         logger.debug('transaction', transaction);
  //         logger.debug('fileId in closure', fileId);

  //         if (!transaction) return;

  //         // Update tx_hash
  //         await updateFileChunkTransactionInfo({
  //           tcAddress: account,
  //           txHash: Object(transaction).hash,
  //           fileId,
  //           chunkId: pickedChunk.id,
  //         });
  //       },
  //     });

  //     if (!tx) {
  //       showToastError({
  //         message: 'Rejected request.',
  //       });
  //       return;
  //     }

  //     showToastSuccess({
  //       message:
  //         'Please go to your wallet to authorize the request for the Bitcoin transaction.',
  //     });
  //   } catch (err: unknown) {
  //     logger.error(err);
  //     logger.debug('failed to inscribe next file chunk');
  //     showToastError({
  //       message: (err as Error).message,
  //     });
  //   } finally {
  //     setProcessing(false);
  //   }
  // };

  useEffect(() => {
    const divElement = matrixContainerRef.current;

    if (divElement) {
      const { width, height } = divElement.getBoundingClientRect();
      setDivWidth(width);
      setDivHeight(height);
    }
  }, []);

  if (!file) return null;

  const progress = (finishedChunk / file?.totalChunks) * 100;

  const renderContentStatus = (status: number) => {
    switch (status) {
      case FileProcessStatus.New:
        return (
          <div>
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
            <p onClick={navigateToDetail} className="fileName">
              {`Smart Inscription #${file?.tokenId}` || file?.name}
            </p>
            <FileChunk file={file} />
            {finishedChunk < file.totalChunks && (
              <ArtifactButton
                variant={'primary'}
                className="ctaBtn"
                width={150}
                height={44}
                onClick={() => setShowInscribeModal(true)}
              >
                <p>{showInscribeModal ? 'Processing...' : 'Inscribe'}</p>
              </ArtifactButton>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
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
        {file?.status !== undefined && (
          <InfoWrapper>{renderContentStatus(file.status)}</InfoWrapper>
        )}
      </StyledProcessingItem>
      <ModalInscribeChunk
        show={showInscribeModal}
        handleClose={() => setShowInscribeModal(false)}
        file={file}
      />
    </>
  );
};

export default ProcessingItem;
