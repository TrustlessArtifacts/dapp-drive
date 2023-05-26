/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NETWORKS } from 'tc-connect';

// App configs
export const APP_ENV: string = process.env.NEXT_PUBLIC_MODE!;
export const API_URL: string = process.env.NEXT_PUBLIC_API_URL!;
export const TC_NETWORK_RPC: string = process.env.NEXT_PUBLIC_TC_NETWORK_RPC!;
export const CDN_URL: string = process.env.NEXT_PUBLIC_CDN_URL!;
export const API_FAUCET: string = process.env.NEXT_PUBLIC_API_FAUCET!;

// Contract configs
export const ARTIFACT_CONTRACT: string = process.env.NEXT_PUBLIC_ARTIFACT_CONTRACT!;
export const BNS_CONTRACT: string = process.env.NEXT_PUBLIC_BNS_CONTRACT!;
export const BFS_ADDRESS: string = process.env.NEXT_PUBLIC_BFS_CONTRACT!;

export const TC_WEB_WALLET_URL: string = process.env.NEXT_PUBLIC_TC_WEB_WALLET_URL!;
export const TC_WALLET_CONNECT_URL = process.env.NEXT_PUBLIC_WALLET_CONNECT_URL!;
export const TRANSFER_TX_SIZE = 1000!;
export const BIG_FILE_PROJECT_ID = '420';
export const CURRENT_TC_NETWORK = NETWORKS.find((network) => network.BTCNetwork === 'mainnet')!;

/* eslint-enable @typescript-eslint/no-non-null-assertion */
