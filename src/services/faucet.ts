import { API_FAUCET } from '@/configs';
import { IFaucetStatusResp } from '@/interfaces/api/faucet';
import { apiFetcher } from '@/utils/api';

const API_PATH = API_FAUCET + '/faucet';

export const requestFaucet = (
  linkTweet: string,
  tokenCapcha: string,
  address: string
): Promise<string> =>
  apiFetcher(`${API_PATH}/request`, {
    method: 'POST',
    data: { url: linkTweet, 'g-recaptcha-response': tokenCapcha, address },
  });

export const requestGetFaucetStatus = (
  address: string
): Promise<IFaucetStatusResp[]> => {
  return apiFetcher(`${API_PATH}/list?address=${address}`, {
    method: 'GET',
  });
};
