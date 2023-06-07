import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, ConnectWalletButton } from './ConnectWallet.styled';
import { WalletContext } from '@/contexts/wallet-context';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
// import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { useRouter } from 'next/router';
import { showToastError } from '@/utils/toast';
import ArtifactButton from '@/components/ArtifactButton';
import { CDN_URL } from '@/configs';

const ConnectWallet: React.FC = (): React.ReactElement => {
  const { onConnect, requestBtcAddress, onDisconnect } = useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const user = useSelector(getUserSelector);
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
      console.log(err);
      onDisconnect();
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTE_PATH.HOME);
    }
  }, [isAuthenticated, router, user]);

  return (
    <Wrapper>
      <div className="mainContent">
        <h1 className="title">Connect Wallet</h1>
        <p className="desc">
          Connect your wallet to access Artifacts
        </p>
        <ArtifactButton variant="transparent-wide" width={280} height={48}>
          <ConnectWalletButton disabled={isConnecting} onClick={handleConnectWallet}>
            <img className='wallet-icon' src={`${CDN_URL}/pages/artifacts/heroicons_wallet-solid.svg`}></img>
            <span>{isConnecting ? 'Connecting...' : 'Trustless Computer'}</span>
          </ConnectWalletButton>
        </ArtifactButton>
      </div>
    </Wrapper>
  );
};

export default ConnectWallet;
