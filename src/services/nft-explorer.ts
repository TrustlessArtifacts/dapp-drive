import { API_URL } from '@/configs';
import { ICollection, IUpdateCollectionPayload } from '@/interfaces/api/collection';
import { IInscription } from '@/interfaces/api/inscription';
import { IPagingParams } from '@/interfaces/api/query';
import { camelCaseKeys } from '@/utils/helpers';
import { apiClient } from '.';

const API_PATH = '/nft-explorer';

export const getCollections = async (
  page: number,
  limit: number,
  isShowAll: boolean,
  owner = '',
): Promise<ICollection[]> => {
  const res = await apiClient.get(
    `${API_PATH}/collections?limit=${limit}&page=${page}&allow_empty=${isShowAll}&owner=${owner}`,
  );
  return Object(camelCaseKeys(res));
};

export const getCollectionByWallet = async (
  page: number,
  limit: number,
  isShowAll: boolean,
  walletAddress: string,
): Promise<ICollection[]> => {
  const res = await apiClient.get(
    `${API_PATH}/collections/${walletAddress}?limit=${limit}&page=${page}&allow_empty=${isShowAll}`,
  );
  return Object(camelCaseKeys(res));
};

export const getCollectionDetail = async ({
  contractAddress,
}: {
  contractAddress: string;
}): Promise<ICollection> => {
  const res = await apiClient.get(`${API_PATH}/collections/${contractAddress}`);
  return Object(camelCaseKeys(res));
};

export const getCollectionNfts = async ({
  contractAddress,
  limit = 10,
  page = 1,
  owner = '',
  isShowAll = false,
}: {
  contractAddress: string;
  limit?: number;
  page?: number;
  owner?: string;
  isShowAll: boolean;
}): Promise<IInscription[]> => {
  const res = await apiClient.get(
    `${API_PATH}/collections/${contractAddress}/nfts?limit=${limit}&page=${page}&owner=${owner}&allow_empty=${isShowAll}`,
  );
  return Object(camelCaseKeys(res));
};

export const getNFTDetail = async ({
  contractAddress,
  tokenId,
}: {
  contractAddress: string;
  tokenId: string;
}): Promise<IInscription> => {
  const res = await apiClient.get(
    `${API_PATH}/collections/${contractAddress}/nfts/${tokenId}`,
  );
  return Object(camelCaseKeys(res));
};

export const getNFTsByWalletAddress = async ({
  page,
  limit,
  walletAddress,
}: {
  walletAddress: string;
} & IPagingParams): Promise<unknown> => {
  const res = await apiClient.get(
    `${API_PATH}/owner-address/${walletAddress}/nfts?limit=${limit}&page=${page}`,
  );
  return Object(camelCaseKeys(res));
};

export const updateCollection = async ({
  contractAddress,
  payload,
}: {
  contractAddress: string;
  payload: IUpdateCollectionPayload;
}): Promise<unknown> => {
  const res = await apiClient.put(
    `${API_PATH}/collections/${contractAddress}`,
    payload,
  );
  return Object(camelCaseKeys(res));
};

export const getURLContent = (contractAddress: string, tokenId: string) => {
  return (
    API_URL + `/nft-explorer/collections/${contractAddress}/nfts/${tokenId}/content`
  );
};

export const getImageURLContent = (src: string) => {
  return API_URL.replace('/dapp/api', '') + src;
};

export const refreshMetadata = async (
  contractAddress: string,
  tokenID: string,
): Promise<any> => {
  const res = await apiClient.get(
    `${API_PATH}/refresh-nft/contracts/${contractAddress}/token/${tokenID}`,
  );
  return Object(camelCaseKeys(res));
};
