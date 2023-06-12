import { IProfileResponse } from '@/interfaces/api/profile';
import { apiClient } from '.';
import { camelCaseKeys } from '@/utils/helpers';
import logger from './logger';

const API_PATH = '/profile';

export const getCurrentProfile = async (): Promise<IProfileResponse> => {
  try {
    const res = await apiClient.get(`${API_PATH}/me`);
    return Object(camelCaseKeys(res));
  } catch (err: unknown) {
    logger.error(err);
    throw Error('Profile not found');
  }
};
