import { ChunkProcessStatus } from "@/enums/file";

export interface IGetUploadedFileListParams {
  contract_address?: string;
  token_id?: string;
  wallet_address?: string;
  tx_hash?: string;
}

export interface IUploadFileResponseItem {
  id: string;
  name: string;
  path: string;
  fullPath: string;
  size: number;
  fileType: string;
  createdAt: string;
  chunks: number;
  chunk_size: number;
  txHash: string;
  tokenId: string;
  walletAddress: string;
  contractAddress: string;
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
}

export interface IUpdateFileTransactionInfoPayload {
  tcAddress?: string;
  txHash: string;
  fileId: string;
}

export interface IUpdateFileChunkTransactionInfoPayload {
  tcAddress?: string;
  txHash: string;
  fileId: string;
  chunkId: string;
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
