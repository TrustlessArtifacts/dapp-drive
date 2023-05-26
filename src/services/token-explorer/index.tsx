import { API_URL } from '@/configs';
import { IPagingParams } from '@/interfaces/api/query';
import { apiFetcher } from '@/utils/api';
import queryString from 'query-string';

const API_PATH = '/token-explorer';

//TODO:  add type
export const getTokens = async (params: IPagingParams): Promise<unknown> => {
  const qs = '?' + queryString.stringify(params);

  return apiFetcher(`${API_URL}${API_PATH}/tokens${qs}`, {
    method: 'GET',
    error: 'Fail to get tokens data',
  });
};

export const getTokensByWallet = async (
  params: {
    key: string;
  } & IPagingParams
): Promise<unknown> => {
  const qs = '?' + queryString.stringify(params);
  return apiFetcher(`${API_URL}${API_PATH}/tokens${qs}`, {
    method: 'GET',
    error: 'Fail to get tokens data',
  });
};
