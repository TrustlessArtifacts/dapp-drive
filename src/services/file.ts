import {
  ICompleteMultipartUploadPayload,
  ICompleteMultipartUploadResponse,
  IGetFileChunkParams,
  IGetFileChunkResponse,
  IGetUploadedFileListParams,
  IInitiateMultipartUploadPayload,
  IInitiateMultipartUploadResponse,
  IUpdateFileChunkTransactionInfoPayload,
  IUpdateFileTransactionInfoPayload,
  IUploadFileResponseItem
} from '@/interfaces/api/files';
import queryString from 'query-string';
import { apiClient } from '.';
import { camelCaseKeys } from '@/utils/helpers';

const API_PATH = '/upload';

export const initiateMultipartUpload = async (
  payload: IInitiateMultipartUploadPayload
): Promise<IInitiateMultipartUploadResponse> => {
  try {
    const res = await apiClient.post<
      IInitiateMultipartUploadPayload,
      IInitiateMultipartUploadResponse
    >(`${API_PATH}/multipart`, {
      group: 'generative-project-upload',
      ...payload,
    });
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    throw Error('Failed to initiate multipart upload file');
  }
};

export const completeMultipartUpload = async (
  payload: ICompleteMultipartUploadPayload
): Promise<ICompleteMultipartUploadResponse> => {
  try {
    const { uploadId } = payload;
    const res = await apiClient.post<unknown, ICompleteMultipartUploadResponse>(
      `${API_PATH}/multipart/${uploadId}`,
      {}
    );
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    throw Error('Failed to complete multipart upload file');
  }
};

export const updateFileTransactionInfo = async (payload: IUpdateFileTransactionInfoPayload): Promise<unknown> => {
  try {
    const { fileId, txHash, ...rest } = payload;
    const res = await apiClient.put<unknown, ICompleteMultipartUploadResponse>(
      `${API_PATH}/file/${fileId}/tx_hash/${txHash}`,
      { rest }
    );
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    throw Error('Failed to complete multipart upload file');
  }
}

export const updateFileChunkTransactionInfo = async (payload: IUpdateFileChunkTransactionInfoPayload): Promise<unknown> => {
  try {
    const { fileId, chunkId, txHash, ...rest } = payload;
    const res = await apiClient.put<unknown, ICompleteMultipartUploadResponse>(
      `${API_PATH}/file/${fileId}/chunks/${chunkId}/tx_hash/${txHash}`,
      { rest }
    );
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    throw Error('Failed to complete multipart upload file');
  }
}

export const getUploadedFileList = async (params: IGetUploadedFileListParams): Promise<Array<IUploadFileResponseItem>> => {
  try {
    const qs = queryString.stringify(params);
    const res = await apiClient.get<Array<IUploadFileResponseItem>>(`${API_PATH}/file?${qs}`,);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    throw Error('Failed to get uploaded file list');
  }
}

export const getFileChunk = async (params: IGetFileChunkParams): Promise<IGetFileChunkResponse> => {
  try {
    const { fileId, chunkId } = params;
    const res = await apiClient.get<IGetFileChunkResponse>(`${API_PATH}/file?${fileId}/chunks/${chunkId}`,);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    throw Error('Failed to get file chunk');
  }
}
