import ArtifactButton from '@/components/ArtifactButton';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';
import { CDN_URL, TRANSFER_TX_SIZE } from '@/configs';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useChunkedFileUploader from '@/hooks/useChunkedFileUploader';
import useWindowSize from '@/hooks/useWindowSize';
import { compressFileAndGetSize, updateFileTransactionInfo } from '@/services/file';
import logger from '@/services/logger';
import { readFileAsBuffer } from '@/utils';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { prettyPrintBytes } from '@/utils/units';
import { useWeb3React } from '@web3-react/core';
import { Transaction } from 'ethers';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuidv4 } from 'uuid';
import { StyledModalUpload } from './ModalUpload.styled';
import EstimatedFee from '@/components/EstimatedFee';
import { AssetsContext } from '@/contexts/assets-context';
import * as TC_SDK from 'trustless-computer-sdk';
import web3Provider from '@/connections/custom-web3-provider';
import BigNumber from 'bignumber.js';
import { IInscription } from '@/interfaces/api/inscription';
import useStoreChunks, { IStoreChunkParams } from '@/hooks/contract-operations/artifacts/useStoreChunks';
import { ROOT_ADDRESS } from '@/constants/common';

interface IProps {
  show: boolean;
  handleClose: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
  inscription?: IInscription;
};

const ModalOwnerUpload: React.FC<IProps> = (props: IProps) => {
  const router = useRouter();
  const { mobileScreen } = useWindowSize();
  const { account } = useWeb3React();
  const { show = false, handleClose, file, setFile, inscription } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { upload } = useChunkedFileUploader();
  const [processing, setIsProcessing] = useState(false);
  const { run: storeChunks } = useContractOperation<
    IStoreChunkParams,
    Transaction | null
  >({
    operation: useStoreChunks,
    inscribeable: true,
  });
  const { estimateGas } = useStoreChunks();
  const { feeRate } = useContext(AssetsContext);
  const [estBTCFee, setEstBTCFee] = useState<string | null>(null);
  const [estTCFee, setEstTCFee] = useState<string | null>(null);

  const calculateEstBtcFee = useCallback(async () => {
    if (!file) return;

    try {
      setEstBTCFee(null);

      let tcTxSizeByte = TRANSFER_TX_SIZE;
      if (file.size < BLOCK_CHAIN_FILE_LIMIT) {
        const fileBuffer = await readFileAsBuffer(file);
        const { compressedSize } = await compressFileAndGetSize({
          fileBase64: fileBuffer.toString('base64'),
        });
        tcTxSizeByte = TRANSFER_TX_SIZE + compressedSize;
      }
      const estimatedEconomyFee = TC_SDK.estimateInscribeFee({
        tcTxSizeByte: tcTxSizeByte,
        feeRatePerByte: feeRate.hourFee,
      });

      setEstBTCFee(estimatedEconomyFee.totalFee.toString());
    } catch (err: unknown) {
      logger.error(err);
    }
  }, [file, setEstBTCFee, feeRate.hourFee]);

  const calculateEstTcFee = useCallback(async () => {
    if (!file || !estimateGas || !account || !inscription) {
      return;
    }

    setEstTCFee(null);
    if (file.size >= BLOCK_CHAIN_FILE_LIMIT) return;

    try {
      const fileBuffer = await readFileAsBuffer(file);
      const payload: IStoreChunkParams = {
        tokenId: inscription.tokenId,
        chunkIndex: 0,
        chunks: fileBuffer,
      };
      const gasLimit = await estimateGas(payload);
      const gasPrice = await web3Provider.getGasPrice();
      const gasLimitBN = new BigNumber(gasLimit);
      const gasPriceBN = new BigNumber(gasPrice);
      const tcGas = gasLimitBN.times(gasPriceBN);
      logger.debug('TC Gas', tcGas.toString());
      setEstTCFee(tcGas.toString());
    } catch (err: unknown) {
      logger.error(err);
    }
  }, [file, setEstTCFee, estimateGas, account, inscription]);

  const handleUploadFile = async () => {
    if (!account) {
      showToastError({
        message: 'Please connect wallet to continue.',
      });
      router.push(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
      return;
    }

    if (!file || !inscription) {
      showToastError({
        message: 'File is required',
      });
      return;
    }

    try {
      // Upload to server
      // Save file info with root address as txhash
      // Fetch file chunks
      // Store chunk
      setIsProcessing(true);


      if (file.size < BLOCK_CHAIN_FILE_LIMIT) {
        logger.debug('Small file');
        const chunkData = await readFileAsBuffer(file);
        logger.debug('decodedChunkData', chunkData.toString('base64'));

        const tx = await storeChunks({
          tokenId: inscription.tokenId,
          chunkIndex: 0,
          chunks: chunkData
        });

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
        handleClose();
      } else {
        logger.debug('Big file');
        const { fileId } = await upload(file, uuidv4());

        // Update tx_hash
        await updateFileTransactionInfo({
          fileId,
          tcAddress: account,
          txHash: ROOT_ADDRESS,
          tokenId: inscription.tokenId,
        });
        router.push(ROUTE_PATH.STATUS);
        handleClose();
      }

    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onChangeFile = (file: File): void => {
    setFile(file);
    setError('');
  };

  const isBigFile = useMemo(
    () => !!(file && file.size && file.size > BLOCK_CHAIN_FILE_LIMIT),
    [file],
  );

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, [file]);

  useEffect(() => {
    calculateEstBtcFee();
  }, [calculateEstBtcFee]);

  useEffect(() => {
    calculateEstTcFee();
  }, [calculateEstTcFee]);

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <IconSVG
          className="cursor-pointer hover-opacity"
          onClick={handleClose}
          src={`${CDN_URL}/pages/artifacts/icons/ic-close.svg`}
          maxWidth={'24'}
        />
      </Modal.Header>
      <Modal.Body>
        <FileUploader
          handleChange={onChangeFile}
          name={'fileUploader'}
          classes={'dropZone'}
        >
          <>
            {file && (
              <div className="preview-wrapper">
                {preview ? (
                  <div className="thumbnail-wrapper">
                    <MediaPreview
                      previewExt={file?.name?.split('.')?.pop() || ''}
                      previewUrl={preview}
                    />
                  </div>

                ) : (
                  <img
                    src={`${CDN_URL}/images/default-upload-img.png`}
                    alt="default upload image"
                  ></img>
                )}
                <div className="file-upload-name">
                  <Text
                    className="file-name"
                    size={'regular'}
                  >{`${file.name}`}</Text>
                  <Text>{prettyPrintBytes(file.size)}</Text>
                </div>
              </div>
            )}

            {error && <p className={'error-text'}>{error}</p>}
          </>
        </FileUploader>
        <div className="right_content">
          {!isBigFile && (
            <EstimatedFee
              estimateBTCGas={estBTCFee}
              estimateTCGas={estTCFee}
              isBigFile={isBigFile}
              uploadView
            />
          )}

          {file && !error && (
            <ArtifactButton
              variant="primary"
              width={221}
              height={52}
              objectFit={mobileScreen ? 'contain' : 'cover'}
              className="confirm-btn-wrapper"
            >
              <Button
                disabled={processing}
                className="confirm-btn"
                onClick={handleUploadFile}
              >
                <Text size="medium" fontWeight="medium" className="confirm-text">
                  {processing ? 'Processing...' : isBigFile ? 'reserve' : 'upload'}
                </Text>
              </Button>
            </ArtifactButton>
          )}
          {isBigFile && (
            <Text size="medium" className="big-file-note">
              This file is over 350KB, you will need to reserve first before inscribe
              into bitcoin.
            </Text>
          )}
        </div>
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default ModalOwnerUpload;
