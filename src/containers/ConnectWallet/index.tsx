import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, ConnectWalletButton } from './ConnectWallet.styled';
import { WalletContext } from '@/contexts/wallet-context';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { CDN_URL } from '@/configs';
import { Container } from '@/layouts';
import { ROUTE_PATH } from '@/constants/route-path';
import { useRouter } from 'next/router';
import { showError } from '@/utils/toast';

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
      showError({
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
    <Container>
      <Wrapper>
        {/* <div className="header">
          <div className="socialContainer">
            <a href="https://generative.xyz/discord" target="_blank">
              <img
                alt="icon"
                className="icon"
                src={`${CDN_URL}/icons/ic-discord-18x18.svg`}
              />
            </a>
            <a href="https://twitter.com/DappsOnBitcoin" target="_blank">
              <img
                alt="icon"
                className="icon"
                src={`${CDN_URL}/icons/ic-twitter-18x18.svg`}
              />
            </a>
          </div>
        </div> */}
        <div className="mainContent">
          <img
            width={292}
            height={118}
            className="logo"
            src={`${CDN_URL}/icons/artifact_wallet_logo.svg`}
            alt="trustless computer logo"
          />
          <h1 className="title">
            Trustless Computer is an open-source protocol that powers decentralized
            applications on Bitcoin.
          </h1>
          <ConnectWalletButton disabled={isConnecting} onClick={handleConnectWallet}>
            {isConnecting ? 'Connecting...' : 'Connect wallet'}
          </ConnectWalletButton>
        </div>
      </Wrapper>
    </Container>
  );
};

export default ConnectWallet;
