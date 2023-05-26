import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, ConnectWalletButton } from './ConnectWallet.styled';
import { WalletContext } from '@/contexts/wallet-context';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { Container } from '@/layouts';
import { ROUTE_PATH } from '@/constants/route-path';
import { useRouter } from 'next/router';
import { showToastError } from '@/utils/toast';
import logger from '@/services/logger';

const ConnectWallet: React.FC = (): React.ReactElement => {
  const { connect, disconnect } = useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await connect();
    } catch (err) {
      showToastError({
        message: (err as Error).message,
      });
      logger.error(err);
      disconnect();
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
    <Container>
      <Wrapper>
        <div className="mainContent">
          <h1 className="title">{`Connect Wallet`}</h1>
          <p className="desc">
            {`Connect your wallet to access Artifacts on Trustless Computer.`}
          </p>
          <ConnectWalletButton disabled={isConnecting} onClick={handleConnectWallet}>
            {isConnecting ? 'Connecting...' : 'Connect wallet'}
          </ConnectWalletButton>
        </div>
      </Wrapper>
    </Container>
  );
};

export default ConnectWallet;
