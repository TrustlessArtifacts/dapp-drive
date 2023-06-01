import { AssetsContext } from '@/contexts/assets-context';
import { formatBTCPrice, formatEthPrice } from '@/utils/format';
import React, { useContext } from 'react';
import { ConnectWalletButton, WalletBalance } from '../Header.styled';
import { Wrapper } from './MenuMobile.styled';
import { useSelector } from 'react-redux';
import { getIsAuthenticatedSelector } from '@/state/user/selector';
import { ROUTE_PATH } from '@/constants/route-path';
import { CDN_URL } from '@/configs';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import { useWeb3React } from '@web3-react/core';


interface IProp {
  isOpen: boolean;
  onCloseMenu: () => void;
}

const MenuMobile = ({ onCloseMenu, isOpen }: IProp) => {

  const { btcBalance, juiceBalance } = useContext(AssetsContext);
  const { account } = useWeb3React();

  const isAuthenticated = useSelector(getIsAuthenticatedSelector);
  const router = useRouter();

  const handleConnectWallet = async () => {
    router.push(`${ROUTE_PATH.CONNECT_WALLET}?next=${window.location.href}`);
  };

  return (

    <Wrapper isOpen={isOpen}>
      <Image
        className="bg"
        src={`${CDN_URL}/pages/artifacts/background.jpg`}
        alt={'background'}
        fill
      />
      <div className="inner">
        <button className="btnMenuMobile" onClick={onCloseMenu}>
          <img src={`${CDN_URL}/icons/ic_close_menu.svg`} alt="ic_close_menu" />
        </button>
        <Link href={'https://trustless.computer/'} target="_blank">
          Trustless
        </Link>
        <Link href={'https://tcgasstation.com/'} target="_blank">
          Get TC
        </Link>
        {isAuthenticated ? (
          <div className="wallet mobile">
            <WalletBalance>
              <div className="balance">
                <p>{formatBTCPrice(btcBalance)} BTC</p>
                <span className="divider"></span>
                <p>{formatEthPrice(tcBalance)} TC</p>
              </div>
              <div className="avatar">
                {account ? (
                  <Jazzicon diameter={32} seed={jsNumberForAddress(account)} />
                ) : (
                  <img src={`${CDN_URL}/icons/ic-avatar.svg`} alt="default avatar" />
                )}
              </div>
            </WalletBalance>
          </div>
        ) : (
          <ConnectWalletButton onClick={handleConnectWallet}>
            Connect Wallet
          </ConnectWalletButton>
        )}
      </div>
    </Wrapper>
  );
};

MenuMobile.displayName = 'MenuMobile';
export default MenuMobile;
