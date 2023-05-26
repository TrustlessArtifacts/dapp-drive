import { CURRENT_TC_NETWORK } from '@/configs';
import { ICustomTransaction } from '@/interfaces/transaction';
import Web3 from 'web3';

class Web3Provider {
  private web3: Web3;

  constructor(rpcEndpoint: string) {
    this.web3 = new Web3(rpcEndpoint);
  }

  async getTransaction(txHash: string): Promise<ICustomTransaction> {
    const tx = (await this.web3.eth.getTransaction(txHash)) as ICustomTransaction;
    return tx;
  }

  async getBalance(tcAdrress: string): Promise<string> {
    const balance = await this.web3.eth.getBalance(tcAdrress);
    return balance;
  }
}

const web3Provider = new Web3Provider(CURRENT_TC_NETWORK.TCNode);

export default web3Provider;
