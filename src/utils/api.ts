/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { camelCaseKeys } from './helpers';

export const reorderKeys = (obj = {} as any) => {
  const newObj = {} as any;
  Object.keys(obj)
    .sort()
    .forEach(key => {
      newObj[key] = obj[key];
    });
  return newObj;
};

export const apiFetcher = async (url: string, options: any) => {
  const { method, data, ...rest } = options;

  try {
    const response = await axios.request({ url, method, data, ...rest });
    return camelCaseKeys(response.data.data);
  } catch (error: any) {
    if (error.response) {
      const response = error?.response?.data || error;
      const errorMessage =
        response?.error || error?.Message || JSON.stringify(error);
      throw errorMessage;
    }
    throw new Error(error.config?.error || 'Something went wrong');
  }
};
