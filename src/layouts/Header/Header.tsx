import { CDN_URL } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Wrapper } from './Header.styled';
import MenuMobile from './MenuMobile';
import WalletHeader from './Wallet';
import IconSVG from '@/components/IconSVG';

const Header = ({ height }: { height: number }) => {
  const refMenu = useRef<HTMLDivElement | null>(null);
  const [_isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <Wrapper style={{ height }}>
      <div className="content">
        <Link className="logo" href={ROUTE_PATH.HOME}>
          <img alt="logo" src={`${CDN_URL}/images/drive-logo.svg`} />
          <h1 className="logo-title">Artifacts</h1>
        </Link>

        <MenuMobile ref={refMenu} onCloseMenu={() => setIsOpenMenu(false)} />
        <div className="rightContainer">
          <div className="external-link">
            <Link href={'/about'}>
              About
              <IconSVG
                maxWidth="28"
                src={`${CDN_URL}/artifact/icons/ic-link.svg`}
              ></IconSVG>
            </Link>
            <Link href={'https://trustless.computer/'} target="_blank">
              Trustless
              <IconSVG
                maxWidth="28"
                src={`${CDN_URL}/artifact/icons/ic-link.svg`}
              ></IconSVG>
            </Link>
            <Link href={'https://tcgasstation.com/'} target="_blank">
              Get TC
              <IconSVG
                maxWidth="28"
                src={`${CDN_URL}/artifact/icons/ic-link.svg`}
              ></IconSVG>
            </Link>
          </div>

          <WalletHeader />
          <button className="btnMenuMobile" onClick={() => setIsOpenMenu(true)}>
            <img src={`${CDN_URL}/icons/ic_hambuger.svg`} alt="ic_hambuger" />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
