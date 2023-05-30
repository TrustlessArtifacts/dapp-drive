import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { TransactionEventType } from '@/enums/transaction';
import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { useCallback } from 'react';
import { ethers } from "ethers";
import connector from '@/connectors/tc-connector';
import { IRequestSignResp } from 'tc-connect';
import logger from '@/services/logger';

export interface IStoreChunkParams {
  tokenId: number;
  chunkIndex: number;
  chunks: Buffer;
}

const useStoreChunks: ContractOperationHook<
  IStoreChunkParams,
  IRequestSignResp | null
> = () => {

  const call = useCallback(
    async (params: IStoreChunkParams): Promise<IRequestSignResp | null> => {
      const { tokenId, chunkIndex, chunks } = params;
      const ContractInterface = new ethers.Interface(ArtifactABIJson.abi);
      const encodeAbi = ContractInterface.encodeFunctionData("store", [
        tokenId,
        chunkIndex,
        chunks
      ]);

      const response = await connector.requestSign({
        target: "_blank",
        calldata: encodeAbi,
        to: ARTIFACT_CONTRACT,
        value: "",
        redirectURL: window.location.href,
        isInscribe: true,
        gasPrice: undefined,
        gasLimit: undefined,
        functionType: 'Store',
        functionName: 'store(uint256,uint256,bytes[])',
      });

      logger.debug(response);
      return response;
    },
    [],
  );

  return {
    call: call,
    dAppType: DAppType.BFS,
    transactionType: TransactionEventType.CREATE,
  };
};

export default useStoreChunks;
