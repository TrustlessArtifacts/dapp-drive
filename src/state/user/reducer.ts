import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  btcAddress?: string;
  tcAddress?: string;
  walletAccounts?: Array<{
    btcAddress: string;
    tcAddress: string;
  }>
  secretKey?: string;
}

export const initialState: UserState = {
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
      state.tcAddress = undefined;
      state.btcAddress = undefined;
      state.secretKey = undefined;
      state.walletAccounts = [];
    },
  },
});

export const {
  resetUser,
  updateTcAddress,
  updateBtcAddress,
  updateWalletAccounts,
  updateSecretKey,
} = userSlice.actions;

export default userSlice.reducer;
