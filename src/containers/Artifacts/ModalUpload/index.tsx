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
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';
import logger from '@/services/logger';
import EstimateFee from '../FileEstimateFee';
import { IRequestSignResp } from 'tc-connect';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
// import { v4 as uuidv4 } from 'uuid';
// import useChunkedFileUploader from '@/hooks/useChunkedFileUploader';
// import { updateFileTransactionInfo } from '@/services/file';

type Props = {
  show: boolean;
  handleClose: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
};

const ModalUpload = (props: Props) => {
  const router = useRouter();
  const user = useSelector(getUserSelector);
  const { show = false, handleClose, file, setFile } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { run } = useContractOperation<IPreserveChunkParams, IRequestSignResp | null>({
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
        message: 'Preserved successfully.'
      })

      handleClose();
    } catch (err: unknown) {
      logger.error(err);
      showToastError({
        message: (err as Error).message
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

  useEffect(() => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }, [file]);

  return (
    <StyledModalUpload show={show} onHide={handleClose} centered size="lg">
      <Modal.Header>
        <IconSVG
          className="cursor-pointer"
          onClick={handleClose}
          src={`${CDN_URL}/icons/ic-close.svg`}
          maxWidth={'22px'}
        />
      </Modal.Header>
      <Modal.Body>
        <h5 className="font-medium">Upload file</h5>
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
                  <Text className="file-name" size={'regular'}>{`${file.name
                    } (${prettyPrintBytes(file.size)})`}</Text>
                  {!error && (
                    <IconSVG
                      src={`${CDN_URL}/icons/ic-check.svg`}
                      maxWidth={'20'}
                      color="#00AA6C"
                    />
                  )}
                </div>
              </div>
            )}

            {error && <p className={'error-text'}>{error}</p>}
          </>
        </FileUploader>
        <EstimateFee file={file} />
        {file && !error && (
          <Button
            disabled={isProcessing}
            className="confirm-btn"
            onClick={handleUploadFile}
            background="#39B174"
          >
            <Text size="medium" fontWeight="medium" className="confirm-text">
              {isProcessing ? 'Processing...' : 'Confirm'}
            </Text>
          </Button>
        )}
      </Modal.Body>
    </StyledModalUpload>
  );
};

export default ModalUpload;
