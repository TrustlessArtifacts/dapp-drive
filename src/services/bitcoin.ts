import {
  BINANCE_PAIR,
  FeeRateName,
  ICollectedUTXOResp,
  IFeeRate,
  IPendingUTXO,
  ITokenPriceResp,
} from '@/interfaces/api/bitcoin';
import BigNumber from 'bignumber.js';
import * as TC_SDK from 'trustless-computer-sdk';

const BINANCE_API_URL = 'https://api.binance.com/api/v3';

// Collected UTXO
export const getCollectedUTXO = async (
  btcAddress: string,
  tcAddress: string,
): Promise<ICollectedUTXOResp | undefined> => {
  try {
    const collected = await TC_SDK.getUTXOs({
      btcAddress,
      tcAddress,
    });
    return collected;
  } catch (err) {
    console.log(err);
  }
};

export const getPendingUTXOs = async (btcAddress: string): Promise<IPendingUTXO[]> => {
  let pendingUTXOs = [];
  if (!btcAddress) return [];
  try {
    const res = await fetch(`https://blockstream.info/api/address/${btcAddress}/txs`).then(res => {
      return res.json();
    });
    pendingUTXOs = (res || []).filter((item: IPendingUTXO) => !item.status.confirmed);
  } catch (err) {
    return [];
  }
  return pendingUTXOs;
};

export const getFeeRate = async (): Promise<IFeeRate> => {
  try {
    const res = await fetch('https://mempool.space/api/v1/fees/recommended');
    const fee: IFeeRate = await res.json();
    if (fee[FeeRateName.fastestFee] <= 10) {
      return {
        [FeeRateName.fastestFee]: 15,
        [FeeRateName.halfHourFee]: 10,
        [FeeRateName.hourFee]: 5,
      };
    }
    return fee;
  } catch (err: unknown) {
    console.log(err);
    return {
      [FeeRateName.fastestFee]: 25,
      [FeeRateName.halfHourFee]: 20,
      [FeeRateName.hourFee]: 15,
    };
  }
};

export const getTokenRate = async (pair: BINANCE_PAIR = 'ETHBTC'): Promise<number> => {
  try {
    const res = await fetch(`${BINANCE_API_URL}/ticker/price?symbol=${pair}`);
    const data: ITokenPriceResp = await res.json();
    const rate = data?.price;
    return new BigNumber(rate).toNumber();
  } catch (err: unknown) {
    console.log(err);
    throw err;
  }
};
