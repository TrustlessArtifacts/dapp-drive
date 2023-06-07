import IconSVG from '@/components/IconSVG';
import { CDN_URL, TC_URL } from '@/configs';
// import { ROUTE_PATH } from '@/constants/route-path';
import { AssetsContext } from '@/contexts/assets-context';
import { getIsAuthenticatedSelector, getUserSelector } from '@/state/user/selector';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
// import { formatBTCPrice, formatLongAddress } from '@trustless-computer/dapp-core';
import { useWeb3React } from '@web3-react/core';
import copy from 'copy-to-clipboard';
// import { useRouter } from 'next/router';
import ArtifactButton from '@/components/ArtifactButton';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet-context';
import { DappsTabs } from '@/enums/tabs';
import { formatLongAddress } from '@trustless-computer/dapp-core';
import { useContext, useRef, useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useSelector } from 'react-redux';
import { ConnectWalletButton, WalletBalance, WalletWrapper } from '../Header.styled';
import { WalletPopover } from './Wallet.styled';
import logger from '@/services/logger';
import { showToastError } from '@/utils/toast';

const WalletHeader = () => {
  const { account } = useWeb3React();
  const user = useSelector(getUserSelector);
  const { onDisconnect, onConnect, requestBtcAddress } = useContext(WalletContext);

  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const { btcBalance, juiceBalance } = useContext(AssetsContext);

  const [isConnecting, setIsConnecting] = useState(false);

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

  const [show, setShow] = useState(false);
  const handleOnMouseEnter = () => {
    setShow(true);
  };
  const handleOnMouseLeave = () => {
    console.log('trigger');

    setShow(false);
  };
  const ref = useRef(null);

  // const goToConnectWalletPage = async () => {
  //   router.push(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
  // };

  const onClickCopy = (address: string) => {
    copy(address);
    toast.success('Copied');
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
                  <p className="text">{formatEthPrice(juiceBalance)} TC</p>
                </div>
                <div className="avatar">
                  <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
                </div>
              </WalletBalance>
            </WalletWrapper>
          </div>
        </OverlayTrigger>
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
