import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import Link from 'next/link';
import { useState } from 'react';
import { Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import WalletHeader from './Wallet';
import IconSVG from '@/components/IconSVG';
import useWindowSize from '@/hooks/useWindowSize';

const Header = ({ height }: { height: number }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { mobileScreen, tabletScreen } = useWindowSize();
  return (
    <Wrapper style={{ height }}>
      <div className="content">
        <div className="leftContainer">
          <Link className="logo" href={ROUTE_PATH.HOME}>
            <img alt="logo" src={`${CDN_URL}/pages/artifacts/logo-1.svg`} />
            <h1 className="logo-title">Smart Inscription</h1>
          </Link>
          <Link className="navLink" href={'/about'}>
            About
          </Link>
        </div>

        <MenuMobile isOpen={isOpenMenu} onCloseMenu={() => setIsOpenMenu(false)} />
        <div className="rightContainer">
          <div className="external-link">
            <Link href={'https://trustless.computer/'} target="_blank">
              Trustless
              <IconSVG
                maxWidth="28"
                src={`${CDN_URL}/pages/artifacts/icons/ic-link.svg`}
              ></IconSVG>
            </Link>
            <Link href={'https://tcgasstation.com/'} target="_blank">
              Get TC
              <IconSVG
                maxWidth="28"
                src={`${CDN_URL}/pages/artifacts/icons/ic-link.svg`}
              ></IconSVG>
            </Link>
          </div>

          {!(mobileScreen || tabletScreen) && <WalletHeader />}
          <button className="btnMenuMobile" onClick={() => setIsOpenMenu(true)}>
            <img src={`${CDN_URL}/icons/ic_hambuger.svg`} alt="ic_hambuger" />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
