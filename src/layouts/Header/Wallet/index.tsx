import IconSVG from '@/components/IconSVG';
import { CDN_URL, TC_WEB_WALLET_URL } from '@/configs';
import { AssetsContext } from '@/contexts/assets-context';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import copy from 'copy-to-clipboard';
import { useContext, useRef, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { ConnectWalletButton, WalletBalance } from '../Header.styled';
import { WalletPopover } from './Wallet.styled';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet-context';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import { DappsTabs } from '@/enums/tabs';
import { showToastSuccess } from '@/utils/toast';
import logger from '@/services/logger';
import ArtifactButton from '@/components/ArtifactButton';

const WalletHeader = () => {
  const user = useSelector(getUserSelector);
  const { disconnect, connect } = useContext(WalletContext);
  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { btcBalance, tcBalance } = useContext(AssetsContext);
  const [isConnecting, setIsConnecting] = useState(false);
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await connect();
    } catch (err) {
      logger.error(err);
      disconnect();
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
      <div className="wallet-tc">
        <div className="wallet-item">
          <IconSVG
            src={`${CDN_URL}/icons/logo-white.svg`}
            maxWidth="24"
            maxHeight="24"
          />
          <Text size={'regular'} className="wallet-address" fontWeight="regular">
            {formatLongAddress(user?.tcAddress || '')}
          </Text>
        </div>
        <div className="icCopy" onClick={() => onClickCopy(user?.tcAddress || '')}>
          <IconSVG
            src={`${CDN_URL}/icons/ic-copy-artifact.svg`}
            color="white"
            maxWidth="16"
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
            {formatLongAddress(user?.btcAddress || '')}
          </Text>
        </div>
        <div className="icCopy" onClick={() => onClickCopy(user?.btcAddress || '')}>
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
          onClick={() =>
            window.open(`${TC_WEB_WALLET_URL}?tab=${DappsTabs.ARTIFACT}`)
          }
        >
          <IconSVG src={`${CDN_URL}/icons/ep_wallet-filled.svg`} maxWidth="20" />
          <Text size="medium">Wallet</Text>
        </div>
        <div className="wallet-disconnect" onClick={disconnect}>
          <IconSVG src={`${CDN_URL}/icons/basil_logout-solid.svg`} maxWidth="20" />
          <Text size="medium">Disconnect</Text>
        </div>
      </div>
    </WalletPopover>
  );

  return (
    <>
      {user.tcAddress && isAuthenticated ? (
        <>
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={walletPopover}
            container={ref}
            show={show}
          >
            <div
              className="wallet"
              onClick={() =>
                window.open(`${TC_WEB_WALLET_URL}?tab=${DappsTabs.ARTIFACT}`)
              }
              ref={ref}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            >
              <WalletBalance>
                <div className="balance">
                  <p className="text">{formatBTCPrice(btcBalance)} BTC</p>
                  <span className="divider"></span>
                  <p className="text">{formatEthPrice(tcBalance)} TC</p>
                </div>
                <div className="avatar">
                  <Jazzicon
                    diameter={32}
                    seed={jsNumberForAddress(user.tcAddress)}
                  />
                </div>
              </WalletBalance>
            </div>
          </OverlayTrigger>
        </>
      ) : (
        <ArtifactButton variant="transparent" width={228} height={48}>
          <ConnectWalletButton className="hideMobile" onClick={handleConnectWallet}>
            {isConnecting ? 'Connecting...' : 'Connect wallet'}
          </ConnectWalletButton>
        </ArtifactButton>
      )}
    </>
  );
};

export default WalletHeader;
