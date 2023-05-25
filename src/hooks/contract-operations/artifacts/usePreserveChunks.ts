import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { ERROR_CODE } from '@/constants/error';
import { AssetsContext } from '@/contexts/assets-context';
import { TransactionEventType } from '@/enums/transaction';
import { useContract } from '@/hooks/useContract';
import {
  ContractOperationHook,
  DAppType,
} from '@/interfaces/contract-operation';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { Transaction } from 'ethers';
import { useCallback, useContext } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';

export interface IPreserveChunkParams {
  address: string;
  chunks: Buffer;
  selectFee: number;
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
        const { address, chunks, selectFee } = params;
        console.log({
          tcTxSizeByte: Buffer.byteLength(chunks),
          feeRatePerByte: selectFee,
        });
        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: Buffer.byteLength(chunks),
          feeRatePerByte: selectFee,
        });
        const balanceInBN = new BigNumber(btcBalance);
        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error(ERROR_CODE.INSUFFICIENT_BALANCE);
        }
        const transaction = await contract
          .connect(provider.getSigner())
          .preserveChunks(address, [chunks]);

        return transaction;
      }

      return null;
    },
    [account, provider, contract, btcBalance, feeRate]
  );

  return {
    call: call,
    dAppType: DAppType.BFS,
    transactionType: TransactionEventType.CREATE,
  };
};

export default usePreserveChunks;
