import ArtifactButton from '@/components/ArtifactButton';
import Button from '@/components/Button';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import MediaPreview from '@/components/ThumbnailPreview/MediaPreview';
import { CDN_URL, TRANSFER_TX_SIZE } from '@/configs';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { ROUTE_PATH } from '@/constants/route-path';
import usePreserveChunks, {
  IPreserveChunkParams,
} from '@/hooks/contract-operations/artifacts/usePreserveChunks';
import useContractOperation from '@/hooks/contract-operations/useContractOperation';
import useChunkedFileUploader from '@/hooks/useChunkedFileUploader';
import useWindowSize from '@/hooks/useWindowSize';
import { updateFileTransactionInfo } from '@/services/file';
import logger from '@/services/logger';
import { readFileAsBuffer } from '@/utils';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { prettyPrintBytes } from '@/utils/units';
import { useWeb3React } from '@web3-react/core';
import { Transaction } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FileUploader } from 'react-drag-drop-files';
import { v4 as uuidv4 } from 'uuid';
import { StyledModalUpload } from './ModalUpload.styled';
import EstimatedFee from '@/components/EstimatedFee';

type Props = {
  show: boolean;
  handleClose: () => void;
  file: File | null;
  setFile: (file: File | null) => void;
};

const ModalUpload = (props: Props) => {
  const router = useRouter();
  const { mobileScreen } = useWindowSize();
  const { account } = useWeb3React();
  const { show = false, handleClose, file, setFile } = props;
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { upload } = useChunkedFileUploader();
  const [isProcessing, setIsProcessing] = useState(false);
  const { run: preserveChunks } = useContractOperation<
    IPreserveChunkParams,
    Transaction | null
  >({
    operation: usePreserveChunks,
    inscribeable: true,
  });

  const handleUploadFile = async () => {
    if (!account) {
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

      if (file.size < BLOCK_CHAIN_FILE_LIMIT * 1024) {
        logger.debug('Small file');
        await preserveChunks({
          address: account,
          chunks: [fileBuffer],
        });
      } else {
        logger.debug('Big file');
        // Upload file to server
        const { fileId } = await upload(file, uuidv4());
        logger.debug(`_____fileId: ${fileId}`);

        // Create transaction
        const tx = await preserveChunks({
          address: account,
          chunks: [],
          txSuccessCallback: async (transaction: Transaction | null) => {
            logger.debug('transaction', transaction);
            logger.debug('fileId in closure', fileId);
            if (!transaction) return;

            // Update tx_hash
            await updateFileTransactionInfo({
              fileId,
              txHash: Object(transaction).hash,
            });
          },
        });

        if (!tx) {
          showToastError({
            message: 'Rejected request.',
          });
          return;
        }
      }

      showToastSuccess({
        message:
          'Please go to your wallet to authorize the request for the Bitcoin transaction.',
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

  useEffect(() => {
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, [file]);

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
          <EstimatedFee txSize={file?.size || TRANSFER_TX_SIZE} />
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
