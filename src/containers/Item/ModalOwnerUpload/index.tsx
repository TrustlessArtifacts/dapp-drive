import Button from '@/components/Button';
import ButtonWrapper from '@/components/ButtonWrapper';
import EstimatedFee from '@/components/EstimatedFee';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';
import { CDN_URL, TC_URL, TRANSFER_TX_SIZE } from '@/configs';
import web3Provider from '@/connections/custom-web3-provider';
import { ROOT_ADDRESS } from '@/constants/common';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import useStoreChunks, {
  IStoreChunkParams,
} from '@/hooks/contract-operations/artifacts/useStoreChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useChunkedFileUploader from '@/hooks/useChunkedFileUploader';
import { IInscription } from '@/interfaces/api/inscription';
import { compressFileAndGetSize, updateFileTransactionInfo } from '@/services/file';
import logger from '@/services/logger';
import { readFileAsBuffer } from '@/utils';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { prettyPrintBytes } from '@/utils/units';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { Transaction } from 'ethers';
import { useRouter } from 'next/router';
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Modal } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import * as TC_SDK from 'trustless-computer-sdk';
import { v4 as uuidv4 } from 'uuid';
import { StyledModalUpload } from './ModalUpload.styled';
import Link from 'next/link';

interface IProps {
  show: boolean;
  handleClose: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
  inscription?: IInscription;
}

const ModalOwnerUpload: React.FC<IProps> = (props: IProps) => {
  const router = useRouter();
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
  const { feeRate, btcBalance, tcBalance } = useContext(AssetsContext);

  const [estBTCFee, setEstBTCFee] = useState<string | null>(null);
  const [estTCFee, setEstTCFee] = useState<string | null>(null);
  const [insufficientTC, setInsufficientTC] = useState(false);
  const [insufficientBTC, setInsufficientBTC] = useState(false);

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
          chunks: chunkData,
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

  const renderFooterNoti = useCallback((children: ReactNode) => {
    return (
      <div className="noti-wrapper">
        <IconSVG
          className="icon"
          src={`${CDN_URL}/pages/artifacts/icons/ic-bell.svg`}
          maxWidth={'18'}
        />
        <Text size="small" fontWeight="medium">
          {children}
        </Text>
      </div>
    );
  }, []);

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

  useEffect(() => {
    if (estTCFee) {
      setInsufficientTC(Number(tcBalance) < Number(estTCFee));
    }
  }, [estTCFee, tcBalance]);

  useEffect(() => {
    if (estBTCFee) {
      setInsufficientBTC(Number(btcBalance) < Number(estBTCFee));
    }
  }, [estBTCFee, btcBalance]);

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
            <ButtonWrapper variant="primary" className="confirm-btn-wrapper">
              <Button
                disabled={processing}
                className="confirm-btn"
                onClick={handleUploadFile}
              >
                <Text size="medium" fontWeight="medium" className="confirm-text">
                  {processing ? 'Processing...' : isBigFile ? 'reserve' : 'upload'}
                </Text>
              </Button>
            </ButtonWrapper>
          )}
          {isBigFile && (
            <Text size="medium" className="big-file-note">
              This file is over 350KB, you will need to reserve first before inscribe
              into bitcoin.
            </Text>
          )}
          {insufficientTC &&
            renderFooterNoti(
              <>
                Your TC balance is insufficient. Buy more TC{' '}
                <Link
                  href={'https://tcgasstation.com/'}
                  target="_blank"
                  className="text-underline"
                >
                  here.
                </Link>
              </>,
            )}
          {insufficientBTC &&
            renderFooterNoti(
              <>
                Your BTC balance is insufficient. Consider transfer your BTC to
                Trustless Wallet{' '}
                <Link href={`${TC_URL}`} target="_blank" className="text-underline">
                  here.
                </Link>
              </>,
            )}
        </div>
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default ModalOwnerUpload;
