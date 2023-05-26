import { createSlice } from '@reduxjs/toolkit';
import { ConnectionType } from '@/connection';

export interface UserState {
  selectedWallet?: ConnectionType;
  btcAddress?: string;
  tcAddress?: string;
  walletAccounts?: Array<{
    btcAddress: string;
    tcAddress: string;
  }>;
  secretKey?: string;
}

export const initialState: UserState = {
  selectedWallet: undefined,
  btcAddress: undefined,
  tcAddress: undefined,
  walletAccounts: [],
  secretKey: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateSecretKey(state, { payload }) {
      state.secretKey = payload;
    },
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet;
    },
    updateTcAddress(state, { payload }) {
      state.tcAddress = payload;
    },
    updateBtcAddress(state, { payload }) {
      state.btcAddress = payload;
    },
    updateWalletAccounts(state, { payload }) {
      state.walletAccounts = payload;
    },
    resetUser(state) {
      state.selectedWallet = undefined;
      state.tcAddress = undefined;
      state.btcAddress = undefined;
      state.secretKey = undefined;
      state.walletAccounts = [];
    },
  },
});

export const {
  updateSelectedWallet,
  resetUser,
  updateTcAddress,
  updateBtcAddress,
  updateWalletAccounts,
  updateSecretKey,
} = userSlice.actions;

export default userSlice.reducer;
