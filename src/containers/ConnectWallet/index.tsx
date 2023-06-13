import ButtonWrapper from '@/components/ButtonWrapper';
import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { WalletContext } from '@/contexts/wallet-context';
import logger from '@/services/logger';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { showToastError } from '@/utils/toast';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConnectWalletButton, Wrapper } from './ConnectWallet.styled';

const ConnectWallet: React.FC = (): React.ReactElement => {
  const { onConnect, requestBtcAddress, onDisconnect } = useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      showToastError({
        message: (err as Error).message,
      });
      logger.error(err);
      onDisconnect();
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTE_PATH.HOME);
    }
  }, [isAuthenticated, router]);

  return (
    <Wrapper>
      <div className="mainContent">
        <h1 className="title">Connect Wallet</h1>
        <p className="desc">Connect your wallet to access Artifacts</p>
        <ButtonWrapper variant="transparent" className="button-container">
          <ConnectWalletButton disabled={isConnecting} onClick={handleConnectWallet}>
            <img
              alt="wallet-icon"
              className="wallet-icon"
              src={`${CDN_URL}/pages/artifacts/heroicons_wallet-solid.svg`}
            ></img>
            <span>{isConnecting ? 'Connecting...' : 'Trustless Computer'}</span>
          </ConnectWalletButton>
        </ButtonWrapper>
      </div>
    </Wrapper>
  );
};

export default ConnectWallet;
