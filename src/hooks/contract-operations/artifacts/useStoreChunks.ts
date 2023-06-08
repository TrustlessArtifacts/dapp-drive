import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT, TRANSFER_TX_SIZE } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import { useContract } from '@/hooks/useContract';
import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useCallback, useContext } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';
import { Transaction } from 'ethers';
import { formatBTCPrice } from '@/utils/format';
import { compressFileAndGetSize } from '@/services/file';
import logger from '@/services/logger';

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

  const estimateGas = useCallback(
    async (params: IStoreChunkParams): Promise<string> => {
      if (account && provider && contract) {
        const { tokenId, chunkIndex, chunks } = params;

        const estimate = await contract.estimateGas.store(
          tokenId,
          chunkIndex,
          chunks,
        );
        logger.debug('useStoreChunks estimate gas', estimate.toString());
        return estimate.toString();
      }
      return '200000000';
    },
    [contract, provider, account],
  );

  const call = useCallback(
    async (params: IStoreChunkParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        logger.debug('useStoreChunks', params);
        const { tokenId, chunkIndex, chunks, txSuccessCallback } = params;

        const { compressedSize } = await compressFileAndGetSize({
          fileBase64: chunks.toString('base64'),
        });
        const tcTxSizeByte = TRANSFER_TX_SIZE + compressedSize;

        logger.info(`tcTxSizeByte: ${tcTxSizeByte}`);

        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte,
          feeRatePerByte: feeRate.hourFee,
        });

        const balanceInBN = new BigNumber(btcBalance);

        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error(
            `Insufficient BTC balance. Please top up at least ${formatBTCPrice(
              estimatedFee.totalFee.toString(),
            )} BTC.`,
          );
        }
        const gasLimit = estimateGas(params);
        logger.debug('gasLimit', gasLimit);
        const transaction = await contract
          .connect(provider.getSigner())
          .store(tokenId, chunkIndex, chunks, {
            gasLimit: gasLimit,
          });

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
    estimateGas: estimateGas,
    dAppType: DAppType.BFS,
    operationName: 'Store Chunks',
  };
};

export default useStoreChunks;
