import { TC_NETWORK_RPC } from '@/configs';
import { ICustomTransaction } from '@/interfaces/transaction';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';

class CustomWeb3Provider {
  private web3: Web3;

  constructor(rpcEndpoint: string) {
    this.web3 = new Web3(rpcEndpoint);
  }

  async getTransaction(txHash: string): Promise<ICustomTransaction> {
    const tx = (await this.web3.eth.getTransaction(txHash)) as ICustomTransaction;
    return tx;
  }

  async getEstimatedTransactionFee(): Promise<string> {
    const gasPrice = await this.web3.eth.getGasPrice();
    const gasPriceBN = new BigNumber(gasPrice);
    const estimatedFee = gasPriceBN.times(500000);
    return estimatedFee.toString();
  }
}

const instance = new CustomWeb3Provider(TC_NETWORK_RPC);

export default instance;
