import ArtifactABIJson from '@/abis/artifacts.json';
import { ARTIFACT_CONTRACT } from '@/configs';
import { TransactionEventType } from '@/enums/transaction';
import { ContractOperationHook, DAppType } from '@/interfaces/contract-operation';
import { useCallback } from 'react';
import { ethers } from "ethers";
import connector from '@/connectors/tc-connector';
import { IRequestSignResp } from 'tc-connect';
import logger from '@/services/logger';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@/state/user/selector';

export interface IPreserveChunkParams {
  address: string;
  chunks: Array<Buffer>;
}

const usePreserveChunks: ContractOperationHook<
  IPreserveChunkParams,
  IRequestSignResp | null
> = () => {
  const user = useSelector(getUserSelector);

  const call = useCallback(
    async (params: IPreserveChunkParams): Promise<IRequestSignResp | null> => {
      const { address, chunks } = params;
      const ContractInterface = new ethers.Interface(ArtifactABIJson.abi);
      const encodeAbi = ContractInterface.encodeFunctionData("preserveChunks", [
        address,
        chunks
      ]);

      const response = await connector.requestSign({
        from: user.tcAddress,
        target: "_blank",
        calldata: encodeAbi,
        to: ARTIFACT_CONTRACT,
        value: "",
        redirectURL: window.location.href,
        isInscribe: true,
        gasPrice: undefined,
        gasLimit: undefined,
        functionType: 'Preserve Chunks',
        functionName: 'preserveChunks(address,bytes[])',
      });

      logger.debug(response);
      return response;
    },
    [user?.tcAddress],
  );

  return {
    call: call,
    dAppType: DAppType.BFS,
    transactionType: TransactionEventType.CREATE,
  };
};

export default usePreserveChunks;
