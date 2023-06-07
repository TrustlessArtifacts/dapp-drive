import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT, TRANSFER_TX_SIZE } from '@/configs';
import { BLOCK_CHAIN_FILE_LIMIT } from '@/constants/file';
import { AssetsContext } from '@/contexts/assets-context';
import { useContract } from '@/hooks/useContract';
import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { compressFileAndGetSize } from '@/services/file';
import logger from '@/services/logger';
import { formatBTCPrice } from '@/utils/format';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { Transaction } from 'ethers';
import { useCallback, useContext } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';

export interface IPreserveChunkParams {
  address: string;
  chunks: Array<Buffer>;
  txSuccessCallback?: (_tx: Transaction | null) => Promise<void>;
}

const usePreserveChunks: ContractOperationHook<
  IPreserveChunkParams,
  Transaction | null
> = () => {
  const { account, provider } = useWeb3React();
  const contract = useContract(ARTIFACT_CONTRACT, ArtifactABIJson.abi, true);
  const { btcBalance, feeRate } = useContext(AssetsContext);

  const call = useCallback(
    async (params: IPreserveChunkParams): Promise<Transaction | null> => {
      if (account && provider && contract) {
        logger.debug('usePreserveChunks', params);
        const { address, chunks, txSuccessCallback } = params;
        const firstChunk = chunks.length > 0 ? chunks[0] : null;
        let tcTxSizeByte = TRANSFER_TX_SIZE;

        if (firstChunk && Buffer.byteLength(firstChunk) < BLOCK_CHAIN_FILE_LIMIT) {
          const { compressedSize } = await compressFileAndGetSize({
            fileBase64: firstChunk.toString('base64')
          });
          tcTxSizeByte = TRANSFER_TX_SIZE + compressedSize;
        }

        logger.info(`tcTxSizeByte: ${tcTxSizeByte}`);

        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: tcTxSizeByte,
          feeRatePerByte: feeRate.hourFee,
        });

        const balanceInBN = new BigNumber(btcBalance);
        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error(`Insufficient BTC balance. Please top up at least ${formatBTCPrice(estimatedFee.totalFee.toString())} BTC.`);
        }
        const transaction = await contract
          .connect(provider.getSigner())
          .preserveChunks(address, chunks, {
            gasLimit: '500000'
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
    dAppType: DAppType.BFS,
    operationName: 'Preserve Chunks',
  };
};

export default usePreserveChunks;
