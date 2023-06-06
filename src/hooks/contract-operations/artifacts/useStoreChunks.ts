import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import { useContract } from '@/hooks/useContract';
import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useCallback, useContext } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';
import { Transaction } from 'ethers';
import { formatBTCPrice } from '@/utils/format';

export interface IStoreChunkParams {
  tokenId: string;
  chunkIndex: number;
  chunks: Buffer;
  txSuccessCallback?: (_tx: Transaction | null) => Promise<void>;
}

const useStoreChunks: ContractOperationHook<
  IStoreChunkParams,
  Transaction | null
> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(ARTIFACT_CONTRACT, ArtifactABIJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IStoreChunkParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        const { tokenId, chunkIndex, chunks, txSuccessCallback } = params;

        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: Buffer.byteLength(chunks),
          feeRatePerByte: feeRate.fastestFee,
        });
        const balanceInBN = new BigNumber(btcBalance);

        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error(`Insufficient BTC balance. Please top up at least ${formatBTCPrice(estimatedFee.totalFee.toString())} BTC.`);
        }

        const transaction = await contract
          .connect(provider.getSigner())
          .store(tokenId, chunkIndex, chunks);

        if (txSuccessCallback) {
          await txSuccessCallback(transaction);
        }

        return transaction;
      }

      return null;
    },
    [account, provider, contract, btcBalance, feeRate],
  );

  return {
    call: call,
    dAppType: DAppType.BFS,
    operationName: 'Store chunks',
  };
};

export default useStoreChunks;
