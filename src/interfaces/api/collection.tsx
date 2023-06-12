import { IPagingParams } from './query';

export interface ICollection {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  slug: string;
  contract: string;
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  totalOwners: number;
  cover: string;
  index: number;
  deployedAtBlock: number;
  indexed: boolean;
  indexedAt: string;
  creator: string;
  social: {
    website?: string;
    discord?: string;
    twitter?: string;
  };
}

export interface IUpdateCollectionPayload {
  description?: string;
  name?: string;
  thumbnail?: string;
}

export interface IRefreshMetadataResponse {
  code: string;
  result: string;
}

export interface IGetCollectionNftsQuery extends IPagingParams {
  owner?: string;
  isShowAll?: boolean;
  isBigFile?: boolean;
  sortBy?: string;
  sort?: number;
}
