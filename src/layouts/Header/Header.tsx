import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { useWindowSize } from '@trustless-computer/dapp-core';
import Link from 'next/link';
import { useState } from 'react';
import { Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import WalletHeader from './Wallet';

const Header = ({ height }: { height: number }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { mobileScreen } = useWindowSize();

  return (
    <Wrapper style={{ height }}>
      <div className="content">
        <Link className="logo" href={ROUTE_PATH.HOME}>
          {mobileScreen && (
            <img alt="logo" src={`${CDN_URL}/images/drive-logo.svg`} />
          )}
          {!mobileScreen && (
            <img alt="logo" src={`${CDN_URL}/images/logo-drive-2.svg`} />
          )}
        </Link>

        <MenuMobile
          onCloseMenu={() => setIsOpenMenu(false)}
          isOpenMenu={isOpenMenu}
        />
        <div className="rightContainer">
          <div className="external-link">
            <Link href={'https://trustless.computer/'} target="_blank">
              Trustless
            </Link>
            <Link href={'https://trustlessfaucet.io/'} target="_blank">
              Faucet
            </Link>
          </div>

          <WalletHeader />
          <button className="btnMenuMobile" onClick={() => setIsOpenMenu(true)}>
            <img src={`${CDN_URL}/icons/ic_hambuger.svg`} />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
