import { API_URL } from '@/configs';
import {
  IGenerativeNonceMessagePayload,
  IVerifyNonceMessagePayload,
} from '@/interfaces/api/auth';
import { apiClient } from '.';
import { camelCaseKeys } from '@/utils';

const API_PATH = API_URL + '/auth';

export const generateNonceMessage = async (payload: IGenerativeNonceMessagePayload): Promise<string> => {
  const res = await apiClient.post(`${API_PATH}/nonce`, payload);
  return Object(camelCaseKeys(res));
}

export const verifyNonceMessage = async (payload: IVerifyNonceMessagePayload): Promise<{ token: string; refreshToken: string; }> => {
  const res = await apiClient.post(`${API_PATH}/nonce/verify`, payload);
  return Object(camelCaseKeys(res));
};
