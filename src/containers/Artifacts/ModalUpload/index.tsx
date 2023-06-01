import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';
import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import usePreserveChunks, {
  IPreserveChunkParams,
} from '@/hooks/contract-operations/artifacts/usePreserveChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import { readFileAsBuffer } from '@/utils/file';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { prettyPrintBytes } from '@/utils/units';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import { StyledModalUpload } from './ModalUpload.styled';

import { ERROR_CODE } from '@/constants/error';
import ArtifactButton from '@/components/ArtifactButton';
import useWindowSize from '@/hooks/useWindowSize';


type Props = {
  show: boolean;
  handleClose: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
};

const ModalUpload = (props: Props) => {
  const { mobileScreen } = useWindowSize();
  const router = useRouter();

  const { mobileScreen } = useWindowSize();
  const { account } = useWeb3React();

  const { show = false, handleClose, file, setFile } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { run } = useContractOperation<
    IPreserveChunkParams,
    IRequestSignResp | null
  >({
    operation: usePreserveChunks,
  });
  // const { upload } = useChunkedFileUploader();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadFile = async () => {
    if (!user.tcAddress) {
      router.push(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
      return;
    }

    if (!file) {
      showToastError({
        message: 'File is required',
      });
      return;
    }

    try {
      setIsProcessing(true);
      const fileBuffer = await readFileAsBuffer(file);
      const tx = await run({
        address: user.tcAddress,
        chunks: [fileBuffer],
      });
      logger.debug(tx);

      // if (file.size < BLOCK_CHAIN_FILE_LIMIT * 1024) {
      //   const tx = await run({
      //     address: user.tcAddress,
      //     chunks: [fileBuffer],
      //   });
      // } else {
      //   // Upload file to server
      //   const { fileId } = await upload(file, uuidv4());
      //   logger.debug(`_____fileId: ${fileId}`);

      //   // Create transaction
      //   const tx = await run({
      //     address: user.tcAddress,
      //     chunks: [],
      //   });

      //   logger.debug('______transaction info');
      //   logger.debug(tx);

      //   if (!tx) {
      //     showToastError({
      //       message: 'Rejected request.'
      //     });
      //     return;
      //   }

      //   // Update tx_hash
      //   await updateFileTransactionInfo({
      //     fileId,
      //     txHash: tx.hash,
      //   })
      // }

      showToastSuccess({
        message: 'Preserved successfully.',
      });

      handleClose();
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

  const onSizeError = (): void => {
    setError(
      `File size error, maximum file size is ${BLOCK_CHAIN_FILE_LIMIT * 1000}KB.`,
    );
    setPreview(null);
  };


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

    // const tcTxSizeBytes =
    //   listOfChunks
    //     ?.map((chunk) =>
    //       chunk.reduce((prev, cur) => prev + Buffer.byteLength(cur), 0),
    //     )
    //     .reduce((prev, cur) => prev + cur, 0) || 0;

    // setEstBTCFee(estimatedFee.totalFee.toString());
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
          <Text color="white" className="mb-10">
            {feeRate} sats/vByte
          </Text>
        </div>

        <p className="ext-price" style={{ color: 'white' }}>
          {formatBTCPrice(estFee)} <span>BTC</span>
        </p>
      </div>
    );
  };


  useEffect(() => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }, [file]);

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered>
      <Modal.Header>
        <IconSVG
          className="cursor-pointer hover-opacity"
          onClick={handleClose}
          src={`${CDN_URL}/artifact/icons/ic-close.svg`}
          maxWidth={'22px'}
        />
      </Modal.Header>
      <Modal.Body>
        <FileUploader
          handleChange={onChangeFile}
          name={'fileUploader'}
          maxSize={BLOCK_CHAIN_FILE_LIMIT}
          onSizeError={onSizeError}
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
