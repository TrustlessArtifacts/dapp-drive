/* eslint-disable */
import { API_URL } from '@/configs';
import { apiFetcher } from '@/utils/api';
import {
  IGenerativeNonceMessagePayload,
  IVerifyNonceMessagePayload,
} from '@/interfaces/api/auth';

const API_PATH = API_URL + '/auth';

export const generateNonceMessage = (
  payload: IGenerativeNonceMessagePayload
): Promise<string> =>
  apiFetcher(`${API_PATH}/nonce`, {
    method: 'POST',
    data: payload,
    error: 'Failed to generate nonce message',
  });

export const verifyNonceMessage = (
  payload: IVerifyNonceMessagePayload
): Promise<any> => {
  return apiFetcher(`${API_PATH}/nonce/verify`, {
    method: 'POST',
    data: payload,
    error: 'Failed to verify nonce message',
  });
};
