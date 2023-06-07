import { IMAGE_TYPE } from '@/components/NFTDisplayBox/constant';
import { IPagingParams } from './query';
import { ChunkProcessStatus } from '@/enums/file';

export interface IUploadFilePayload {
  file: File;
}

export interface IUploadFileResponse {
  fileName: string;
  fileSize: number;
  id: string;
  mimeType: string;
  uploadedBy: string;
  url: string;
}

export interface IMinifyFilePayload {
  files: Record<
    string,
    {
      content: string;
      mediaType: string;
    }
  >;
}

export interface IMinifyFileResponse {
  files: Record<
    string,
    {
      content: string;
      mediaType: string;
      deflate: string;
    }
  >;
}

export interface IInitiateMultipartUploadPayload {
  fileName: string;
  group?: string;
}

export interface IInitiateMultipartUploadResponse {
  uploadId: string;
}

export interface ICompleteMultipartUploadPayload {
  uploadId: string;
}

export interface ICompleteMultipartUploadResponse {
  fileUrl: string;
  fileId: string;
}

export interface IResizeImagePayload {
  file: string; // fileBase64
}

export interface IResizeImageResponse {
  file: string; // fileBase64
}

export interface IGetFileChunkParams {
  fileId: string;
  chunkId: string;
}

export interface IGetFileChunkResponse {
  id: string;
  status: ChunkProcessStatus;
  createdAt: string;
  fileId: string;
  chunkIndex: number;
  chunkData: string;
  txHash: string;
}

export interface IGetFileChunksParams {
  fileId: string;
  status?: ChunkProcessStatus;
}

export interface IGetUploadedFileListParams extends IPagingParams {
  contract_address?: string;
  token_id?: string;
  wallet_address?: string;
  tx_hash?: string;
  status?: string;
}

export interface IUpdateFileChunkTransactionInfoPayload {
  tcAddress?: string;
  txHash: string;
  fileId: string;
  chunkId: string;
}

export interface IUpdateFileTransactionInfoPayload {
  tcAddress?: string;
  txHash: string;
  fileId: string;
}

export interface IUploadFileResponseItem {
  id: string;
  name: string;
  path: string;
  fullPath: string;
  size: number;
  fileType: IMAGE_TYPE;
  createdAt: string;
  chunks: number;
  chunkSize: number;
  txHash: string;
  tokenId: string;
  walletAddress: string;
  contractAddress: string;
  processedChunks: number;
  processingChunks: number;
  totalChunks: number;
  status: ChunkProcessStatus;
}

export interface ICompressFileAndGetSizePayload {
  fileBase64: string;
}

export interface ICompressFileAndGetSizeResponse {
  originalSize: number;
  compressedSize: number;
}