import ButtonWrapper from '@/components/ButtonWrapper';
import EstimatedFee from '@/components/EstimatedFee';
import FileChunk from '@/components/FileChunk';
import IconSVG from '@/components/IconSVG';
import NFTDisplayBox from '@/components/NFTDisplayBox';
import Text from '@/components/Text';
import { ARTIFACT_CONTRACT, CDN_URL, TC_URL, TRANSFER_TX_SIZE } from '@/configs';
import web3Provider from '@/connections/custom-web3-provider';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { ChunkProcessStatus } from '@/enums/file';
import useStoreChunks, {
  IStoreChunkParams,
} from '@/hooks/contract-operations/artifacts/useStoreChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { IUploadFileResponseItem } from '@/interfaces/api/files';
import {
  compressFileAndGetSize,
  getFileChunks,
  updateFileChunkTransactionInfo,
} from '@/services/file';
import logger from '@/services/logger';
import { readFileAsBuffer } from '@/utils';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { Transaction } from 'ethers';
import Link from 'next/link';
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
import * as TC_SDK from 'trustless-computer-sdk';
import { StyledModalInscribeChunk } from './ModalInscribeChunk.styled';

type Props = {
  show: boolean;
  handleClose: () => void;
  file: IUploadFileResponseItem;
};

const ModalInscribeChunk = (props: Props) => {
  const router = useRouter();
  const { account } = useWeb3React();
  const { show = false, handleClose, file } = props;
  const [processing, setProcessing] = useState(false);
  const [insufficientTC, setInsufficientTC] = useState(false);
  const [insufficientBTC, setInsufficientBTC] = useState(false);
  const { estimateGas } = useStoreChunks();
  const { feeRate, btcBalance, tcBalance } = useContext(AssetsContext);

  const [estBTCFee, setEstBTCFee] = useState<string | null>(null);
  const [estTCFee, setEstTCFee] = useState<string | null>(null);
  const [chunkFile, setChunkFile] = useState<File | Blob | null>(null);
  const [chunkIndex, setChunkIndex] = useState<number | null>(null);

  const calculateEstBtcFee = useCallback(async () => {
    if (!chunkFile) return;
    try {
      setEstBTCFee(null);

      let tcTxSizeByte = TRANSFER_TX_SIZE;
      const fileBuffer = await readFileAsBuffer(new Blob([chunkFile]));
      const { compressedSize } = await compressFileAndGetSize({
        fileBase64: fileBuffer.toString('base64'),
      });
      tcTxSizeByte = TRANSFER_TX_SIZE + compressedSize;
      const estimatedEconomyFee = TC_SDK.estimateInscribeFee({
        tcTxSizeByte: tcTxSizeByte,
        feeRatePerByte: feeRate.hourFee,
      });

      setEstBTCFee(estimatedEconomyFee.totalFee.toString());
    } catch (err: unknown) {
      logger.error(err);
    }
  }, [setEstBTCFee, feeRate.hourFee, chunkFile]);

  const calculateEstTcFee = useCallback(async () => {
    if (!file || !estimateGas || !account || !chunkFile || chunkIndex === null)
      return;

    setEstTCFee(null);
    let payload: IStoreChunkParams;

    try {
      const fileBuffer = await readFileAsBuffer(chunkFile);
      payload = {
        tokenId: file.tokenId,
        chunkIndex: chunkIndex,
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
  }, [file, setEstTCFee, estimateGas, account, chunkFile, chunkIndex]);

  const isBigFile = useMemo(
    () => (file?.size ? file?.size > BLOCK_CHAIN_FILE_LIMIT : false),
    [file?.size],
  );

  const { run: storeChunks } = useContractOperation<
    IStoreChunkParams,
    Transaction | null
  >({
    operation: useStoreChunks,
    inscribeable: true,
  });

  const finishedChunk = useMemo(() => {
    if (!file) return 0;
    return file.processingChunks + file.processedChunks;
  }, [file]);

  const handleInscribeNextChunk = async (
    evt: React.MouseEvent<HTMLButtonElement>,
  ) => {
    evt.stopPropagation();

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

      logger.debug('unprocessedChunks', unprocessedChunks);

      if (!unprocessedChunks.length || processing) {
        return;
      }
      // Get the first chunk to process
      const pickedChunk = unprocessedChunks[0];
      logger.debug('pickedChunk', pickedChunk);

      const chunkData = Buffer.from(pickedChunk.chunkData, 'base64');
      logger.debug('chunkData', chunkData);

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
        linkText: TC_URL,
      });
    } catch (err: unknown) {
      logger.error(err);
      logger.debug('failed to inscribe next file chunk');
      showToastError({
        message: (err as Error).message,
        url: TC_URL,
        linkText: 'Go to Wallet',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleFetchFile = async () => {
    try {
      if (!file) return;
      const unprocessedChunks = await getFileChunks({
        fileId: file.id,
        status: ChunkProcessStatus.New,
      });

      if (!unprocessedChunks.length || processing) {
        return;
      }
      // Get the first chunk to process
      const pickedChunk = unprocessedChunks[0];
      const decodedChunkData = window.atob(pickedChunk.chunkData);
      const chunkData = Buffer.from(decodedChunkData);

      setChunkFile(new Blob([chunkData]));
      setChunkIndex(pickedChunk.chunkIndex);
    } catch (err: unknown) {
      logger.debug('failed to fetch file chunk');
      showToastError({
        message: (err as Error).message,
      });
    }
  };

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
    handleFetchFile();
  }, []);

  useEffect(() => {
    calculateEstBtcFee();
  }, [calculateEstBtcFee, chunkFile]);

  useEffect(() => {
    calculateEstTcFee();
  }, [calculateEstTcFee, chunkFile]);

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
    <StyledModalInscribeChunk show={show} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <IconSVG
          className="cursor-pointer hover-opacity"
          onClick={handleClose}
          src={`${CDN_URL}/pages/artifacts/icons/ic-close.svg`}
          maxWidth={'24'}
        />
      </Modal.Header>
      <Modal.Body>
        <div className="left_content">
          <NFTDisplayBox
            collectionID={ARTIFACT_CONTRACT}
            contentClass="thumbnail"
            className="thumbnail-wrapper"
            src={file?.fullPath}
            tokenID={file?.tokenId}
            type={file?.fileType}
          />
          <div className="file-name-wrapper">
            <p className="file-name">
              {`Smart Inscription #${file?.tokenId}` || file?.name}
            </p>
            <FileChunk file={file} modalView />
          </div>
        </div>
        <div className="right_content">
          <EstimatedFee
            estimateBTCGas={estBTCFee}
            estimateTCGas={estTCFee}
            isBigFile={isBigFile}
          />
          <ButtonWrapper variant="primary" className="ctaBtn">
            <button onClick={handleInscribeNextChunk} disabled={processing}>
              {processing ? 'Processing...' : `Inscribe pack ${finishedChunk + 1}`}
            </button>
          </ButtonWrapper>
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
    </StyledModalInscribeChunk>
  );
};

export default ModalInscribeChunk;
