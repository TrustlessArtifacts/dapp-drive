import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';
import ToastConfirm from '@/components/ToastConfirm';
import { CDN_URL, TC_URL } from '@/configs';
import { MINT_TOOL_MAX_FILE_SIZE } from '@/constants/config';
import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { DappsTabs } from '@/enums/tabs';
import usePreserveChunks, {
  IPreserveChunkParams,
} from '@/hooks/contract-operations/artifacts/usePreserveChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { readFileAsBuffer } from '@/utils';
import { walletLinkSignTemplate } from '@/utils/configs';
import { showError } from '@/utils/toast';
import { prettyPrintBytes } from '@/utils/units';
import { formatBTCPrice } from '@trustless-computer/dapp-core';
import { useWeb3React } from '@web3-react/core';
import { Transaction } from 'ethers';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import toast from 'react-hot-toast';
import * as TC_SDK from 'trustless-computer-sdk';
import { StyledModalUpload } from './ModalUpload.styled';
import { ERROR_CODE } from '@/constants/error';
import ArtifactButton from '@/components/ArtifactButton';
import useWindowSize from '@/hooks/useWindowSize';
import logger from '@/services/logger';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import useChunkedFileUploader from '@/hooks/useChunkedFileUploader';
import { v4 as uuidv4 } from 'uuid';
import { updateFileTransactionInfo } from '@/services/file';

type Props = {
  show: boolean;
  handleClose: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
};

enum optionFees {
  economy = 'Economy',
  faster = 'Faster',
  fastest = 'Fastest',
}

const ModalUpload = (props: Props) => {
  const router = useRouter();
  const { mobileScreen } = useWindowSize();
  const { account } = useWeb3React();
  const { show = false, handleClose, file, setFile } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectFee, setSelectFee] = useState<number>(0);
  const [activeFee, setActiveFee] = useState(optionFees.fastest);
  const [estBTCFee, setEstBTCFee] = useState({
    economy: '0',
    faster: '0',
    fastest: '0',
  });
  const { feeRate } = useContext(AssetsContext);

  const { run } = useContractOperation<IPreserveChunkParams, Transaction | null>({
    operation: usePreserveChunks,
  });
  const { upload } = useChunkedFileUploader();
  const [isProcessing, setIsProcessing] = useState(false);
  const { dAppType, transactionType } = usePreserveChunks();

  const handleUploadFile = async () => {
    if (!account) {
      router.push(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
      return;
    }

    if (!file) {
      showError({
        message: 'File is required',
      });
      return;
    }

    try {
      setIsProcessing(true);
      const fileBuffer = await readFileAsBuffer(file);

      // const tx = await run({
      //   address: account,
      //   chunks: fileBuffer,
      // });

      if (file.size < BLOCK_CHAIN_FILE_LIMIT * 1024) {
        const tx = await run({
          address: account,
          chunks: [fileBuffer],
        });
      } else {
        // Upload file to server
        const { fileId } = await upload(file, uuidv4());
        logger.debug(`_____fileId: ${fileId}`);

        // Create transaction
        const tx = await run({
          address: account,
          chunks: [],
        });

        logger.debug('______transaction info');
        logger.debug(tx);

        if (!tx) {
          showToastError({
            message: 'Rejected request.',
          });
          return;
        }

        // Update tx_hash
        await updateFileTransactionInfo({
          fileId,
          txHash: tx.hash,
        });
      }

      logger.debug(tx);

      toast.success(
        () => (
          <ToastConfirm
            id="create-success"
            url={walletLinkSignTemplate({
              transactionType,
              dAppType,
              hash: Object(tx).hash,
              isRedirect: true,
            })}
            message="Please go to your wallet to authorize the request for the Bitcoin transaction."
            linkText="Go to wallet"
          />
        ),
        {
          duration: 50000,
          position: 'top-right',
          style: {
            maxWidth: '900px',
            borderLeft: '4px solid #00AA6C',
          },
        },
      );
      handleClose();
    } catch (err: unknown) {
      if ((err as Error).message === ERROR_CODE.PENDING) {
        showError({
          message:
            'You have some pending transactions. Please complete all of them before moving on.',
          url: `${TC_URL}/?tab=${DappsTabs.TRANSACTION}`,
          linkText: 'Go to Wallet',
        });
      } else if ((err as Error).message === ERROR_CODE.INSUFFICIENT_BALANCE) {
        const fileBuffer = await readFileAsBuffer(file);

        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: Buffer.byteLength(fileBuffer),
          feeRatePerByte: selectFee,
        });

        showError({
          message: `Your balance is insufficient. Please top up at least ${formatBTCPrice(
            estimatedFee.totalFee.toString(),
          )} BTC to pay network fee.`,
          url: `${TC_URL}`,
          linkText: 'Go to Wallet',
        });
      } else {
        showError({
          message:
            (err as Error).message ||
            'Something went wrong. Please try again later.',
        });
      }
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const onChangeFile = (file: File): void => {
    setFile(file);
    setError('');
  };

  // const onSizeError = (): void => {
  //   setError(
  //     `File size error, maximum file size is ${MINT_TOOL_MAX_FILE_SIZE * 1000}KB.`,
  //   );
  //   setPreview(null);
  // };

  const handleEstFee = async (): Promise<void> => {
    if (!file) return;

    const fileBuffer = await readFileAsBuffer(file);

    const estimatedFastestFee = TC_SDK.estimateInscribeFee({
      tcTxSizeByte: Buffer.byteLength(fileBuffer),
      feeRatePerByte: feeRate.fastestFee,
    });
    const estimatedFasterFee = TC_SDK.estimateInscribeFee({
      tcTxSizeByte: Buffer.byteLength(fileBuffer),
      feeRatePerByte: feeRate.halfHourFee,
    });
    const estimatedEconomyFee = TC_SDK.estimateInscribeFee({
      tcTxSizeByte: Buffer.byteLength(fileBuffer),
      feeRatePerByte: feeRate.hourFee,
    });

    setEstBTCFee({
      fastest: estimatedFastestFee.totalFee.toString(),
      faster: estimatedFasterFee.totalFee.toString(),
      economy: estimatedEconomyFee.totalFee.toString(),
    });
  };

  const renderEstFee = ({
    title,
    estFee,
    feeRate,
  }: {
    title: optionFees;
    estFee: string;
    feeRate: number;
  }) => {
    return (
      <div
        className={`est-fee-item ${activeFee === title ? 'active' : ''}`}
        onClick={() => {
          setSelectFee(feeRate);
          setActiveFee(title);
        }}
      >
        <div className="est-fee-item-name">
          <Text fontWeight="medium" color="white" size="regular">
            {title}
          </Text>
          <Text color="white">{feeRate} sats/vByte</Text>
        </div>

        <p className="ext-price" style={{ color: 'white' }}>
          {formatBTCPrice(estFee)} <span>BTC</span>
        </p>
      </div>
    );
  };

  useEffect(() => {
    handleEstFee();
  }, [file]);

  useEffect(() => {
    if (file) {
      // const fileSizeInKb = file.size / 1024;
      // if (fileSizeInKb > MINT_TOOL_MAX_FILE_SIZE * 1000) {
      //   onSizeError();
      // } else {
      setPreview(URL.createObjectURL(file));
      // }
    }
  }, [file]);

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <IconSVG
          className="cursor-pointer hover-opacity"
          onClick={handleClose}
          src={`${CDN_URL}/artifact/icons/ic-close.svg`}
          maxWidth={'24'}
        />
      </Modal.Header>
      <Modal.Body>
        <FileUploader
          handleChange={onChangeFile}
          name={'fileUploader'}
          // maxSize={0.35}
          // onSizeError={onSizeError}
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
          <div className="est-fee">
            <Text
              size="medium"
              fontWeight="medium"
              color="white"
              className="title-text"
            >
              network fee estimate
            </Text>
            <div className="est-fee-options">
              {renderEstFee({
                title: optionFees.economy,
                estFee: estBTCFee.economy,
                feeRate: feeRate.hourFee,
              })}
              {renderEstFee({
                title: optionFees.faster,
                estFee: estBTCFee.faster,
                feeRate: feeRate.halfHourFee,
              })}
              {renderEstFee({
                title: optionFees.fastest,
                estFee: estBTCFee.fastest,
                feeRate: feeRate.fastestFee,
              })}
            </div>
          </div>
          {file && !error && (
            <ArtifactButton
              variant="primary"
              width={221}
              height={52}
              objectFit={mobileScreen ? 'contain' : 'cover'}
              className="confirm-btn-wrapper"
            >
              <Button
                disabled={isProcessing}
                className="confirm-btn"
                onClick={handleUploadFile}
              >
                <Text size="medium" fontWeight="medium" className="confirm-text">
                  {isProcessing ? 'Processing...' : 'upload'}
                </Text>
              </Button>
            </ArtifactButton>
          )}
        </div>
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default ModalUpload;
