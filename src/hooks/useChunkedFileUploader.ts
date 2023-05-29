import { API_URL, MULTIPART_CHUNK_SIZE } from '@/configs';
import { completeMultipartUpload, initiateMultipartUpload } from '@/services/file';
import logger from '@/services/logger';
import { useMemo, useState } from 'react';

const API_PATH = `${API_URL}/files/multipart`;

// Upload chunked file
// 1 - Initiates a API multipart upload with a POST request.
// 2 - This initial request generates an upload ID for use in subsequent PUT requests to upload the data in parts
// 3 - and in the final send a POST request to complete the upload progress.

const useChunkedFileUploader = () => {
  const [chunkCount, setChunkCount] = useState(0);
  const [counter, setCounter] = useState(0);

  const uploadProgress = useMemo(() => {
    if (!chunkCount) return 0;
    if (counter > chunkCount) {
      return 100;
    }
    return Math.round((counter / chunkCount) * 100);
  }, [chunkCount, counter]);

  const initUploadProgress = async (file: File, fileName: string): Promise<string> => {
    const res = await initiateMultipartUpload({
      fileName: file.name,
      group: fileName.toLowerCase().replaceAll(' ', '_'),
    });
    return res.uploadId;
  }

  const uploadChunks = async (
    uploadId: string,
    file: File | Blob,
    chunkSize: number
  ): Promise<void> => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    setChunkCount(totalChunks);
    setCounter(0);
    const uploadPromises = [];
    const maxRetries = 3;

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('file', chunk, file.name);

      let retries = 0;
      let success = false;

      while (retries <= maxRetries && !success) {
        try {
          const partNumber = chunkIndex + 1;
          const xhr = new XMLHttpRequest();
          xhr.overrideMimeType('application/octet-stream');
          xhr.open(
            'PUT',
            `${API_PATH}/${uploadId}?partNumber=${partNumber}`,
            true
          );

          const promise = new Promise((resolve, reject) => {
            xhr.onload = () => {
              if (xhr.status === 200) {
                resolve(xhr.response);
                setCounter(prev => prev + 1);
              } else {
                reject(xhr.statusText);
              }
            };

            xhr.onerror = () => {
              reject(xhr.statusText);
            };

            xhr.send(formData);
          });

          uploadPromises.push(promise);
          success = true;
        } catch (error) {
          logger.error(error);
          retries++;
        }
      }

      if (!success) {
        logger.error(`Upload failed after ${maxRetries} retries`);
        return;
      }
    }

    try {
      await Promise.all(uploadPromises);
    } catch (error: unknown) {
      setCounter(0);
      logger.error('Upload chunk file error');
      throw Error('Upload chunk file error');
    }
  };

  const completeUploadProgress = async (uploadId: string): Promise<string> => {
    const res = await completeMultipartUpload({
      uploadId: uploadId,
    });

    return res.fileUrl;
  }

  const upload = async (file: File, fileName: string): Promise<string> => {
    const uploadId = await initUploadProgress(file, fileName);
    await uploadChunks(uploadId, file, MULTIPART_CHUNK_SIZE);
    const fileUrl = await completeUploadProgress(uploadId);
    return fileUrl;
  }

  return { upload, uploadProgress };
};

export default useChunkedFileUploader;
