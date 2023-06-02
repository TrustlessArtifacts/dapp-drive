import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { ERROR_CODE } from '@/constants/error';
import { AssetsContext } from '@/contexts/assets-context';
import { TransactionEventType } from '@/enums/transaction';
import { useContract } from '@/hooks/useContract';
import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useCallback, useContext } from 'react';
import * as TC_SDK from 'trustless-computer-sdk';
import { Transaction } from 'ethers';

export interface IStoreChunkParams {
  tokenId: number;
  chunkIndex: number;
  chunks: Buffer;
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
        const { tokenId, chunkIndex, chunks } = params;
        const estimatedFee = TC_SDK.estimateInscribeFee({
          tcTxSizeByte: Buffer.byteLength(chunks),
          feeRatePerByte: feeRate.fastestFee,
        });
        const balanceInBN = new BigNumber(btcBalance);

        if (balanceInBN.isLessThan(estimatedFee.totalFee)) {
          throw Error(ERROR_CODE.INSUFFICIENT_BALANCE);
        }
        const transaction = await contract
          .connect(provider.getSigner())
          .store(tokenId, chunkIndex, chunks);

        return transaction;
      }

      return null;

      //   const ContractInterface = new ethers.Interface(ArtifactABIJson.abi);
      //   const encodeAbi = ContractInterface.encodeFunctionData("store", [
      //     tokenId,
      //     chunkIndex,
      //     chunks
      //   ]);

      //   const response = await connector.requestSign({
      //     target: "_blank",
      //     calldata: encodeAbi,
      //     to: ARTIFACT_CONTRACT,
      //     value: "",
      //     redirectURL: window.location.href,
      //     isInscribe: true,
      //     gasPrice: undefined,
      //     gasLimit: undefined,
      //     functionType: 'Store',
      //     functionName: 'store(uint256,uint256,bytes[])',
      //   });

      //   logger.debug(response);
      //   return response;
    },
    [account, provider, contract, btcBalance, feeRate],
  );

  return {
    call: call,
    dAppType: DAppType.BFS,
    operationName: TransactionEventType.CREATE,
  };
};

export default useStoreChunks;
