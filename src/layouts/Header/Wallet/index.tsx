import ButtonWrapper from '@/components/ButtonWrapper';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { CDN_URL, TC_URL } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import { WalletContext } from '@/contexts/wallet-context';
import { DappsTabs } from '@/enums/tabs';
import logger from '@/services/logger';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import { showToastError, showToastSuccess } from '@/utils/toast';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import { useWeb3React } from '@web3-react/core';
import copy from 'copy-to-clipboard';
import { useContext, useRef, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { ConnectWalletButton, WalletBalance, WalletWrapper } from '../Header.styled';
import { WalletPopover } from './Wallet.styled';

const WalletHeader = () => {
  const { account } = useWeb3React();
  const user = useSelector(getUserSelector);
  const { onDisconnect, onConnect, requestBtcAddress } = useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { btcBalance, tcBalance } = useContext(AssetsContext);
  const [show, setShow] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const ref = useRef(null);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await onConnect();
      await requestBtcAddress();
    } catch (err) {
      logger.error(err);
      onDisconnect();
      showToastError({
        message: (err as Error).message,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleOnMouseEnter = () => {
    setShow(true);
  };
  const handleOnMouseLeave = () => {
    setShow(false);
  };

  const onClickCopy = (address: string) => {
    copy(address);
    showToastSuccess({
      message: 'Copied',
    });
  };

  const walletPopover = (
    <WalletPopover
      id="wallet-header"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      show={show}
    >
      <div className="wrapper">
        <div className="wallet-tc">
          <div className="wallet-item">
            <IconSVG
              src={`${CDN_URL}/icons/logo-white.svg`}
              maxWidth="24"
              maxHeight="24"
            />
            <Text size={'regular'} className="wallet-address" fontWeight="regular">
              {formatLongAddress(user?.walletAddress || '')}
            </Text>
          </div>
          <div
            className="icCopy"
            onClick={() => onClickCopy(user?.walletAddress || '')}
          >
            <IconSVG
              src={`${CDN_URL}/icons/ic-copy-artifact.svg`}
              color="white"
              maxWidth="16"
              // type="stroke"
            ></IconSVG>
          </div>
        </div>
        <div className="divider"></div>
        <div className="wallet-btc">
          <div className="wallet-item">
            <IconSVG
              src={`${CDN_URL}/icons/ic-btc.svg`}
              maxWidth="24"
              maxHeight="24"
            />
            <Text size={'regular'} className="wallet-address" fontWeight="regular">
              {formatLongAddress(user?.walletAddressBtcTaproot || '')}
            </Text>
          </div>
          <div
            className="icCopy"
            onClick={() => onClickCopy(user?.walletAddressBtcTaproot || '')}
          >
            <IconSVG
              src={`${CDN_URL}/icons/ic-copy-artifact.svg`}
              color="white"
              maxWidth="16"
            ></IconSVG>
          </div>
        </div>
        <div className="divider"></div>
        <div className="cta">
          <div
            className="wallet-link"
            onClick={() => window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)}
          >
            <IconSVG src={`${CDN_URL}/icons/ep_wallet-filled.svg`} maxWidth="20" />
            <Text size="medium">Wallet</Text>
          </div>
          <div className="wallet-disconnect" onClick={onDisconnect}>
            <IconSVG src={`${CDN_URL}/icons/basil_logout-solid.svg`} maxWidth="20" />
            <Text size="medium">Disconnect</Text>
          </div>
        </div>
      </div>
    </WalletPopover>
  );

  return (
    <>
      {account && isAuthenticated ? (
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="bottom"
          overlay={walletPopover}
          container={ref}
          show={show}
        >
          <div
            // className="wallet"
            onClick={() => window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)}
            ref={ref}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <WalletWrapper>
              <WalletBalance>
                <div className="balance">
                  <p className="text">{formatBTCPrice(btcBalance)} BTC</p>
                  <span className="divider"></span>
                  <p className="text">{formatEthPrice(tcBalance)} TC</p>
                </div>
                <div className="avatar">
                  <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
                </div>
              </WalletBalance>
            </WalletWrapper>
          </div>
        </OverlayTrigger>
      ) : (
        <ButtonWrapper variant="transparent" className="button-container">
          <ConnectWalletButton className="hideMobile" onClick={handleConnectWallet}>
            {isConnecting ? 'Connecting...' : 'Connect wallet'}
          </ConnectWalletButton>
        </ButtonWrapper>
      )}
    </>
  );
};

export default WalletHeader;
