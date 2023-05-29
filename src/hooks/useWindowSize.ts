import {
  MOBILE_SCREEN,
  TABLET_SCREEN,
  XS_MOBILE_SCREEN,
} from '@/constants/breakpoint';
import { useEffect, useState } from 'react';

interface Size {
  sreenWidth: number;
  heightWidth: number;
}

interface CheckMobile {
  xSMobileScreen: boolean;
  mobileScreen: boolean;
  tabletScreen: boolean;
  desktopScreen: boolean;
}

function useWindowSize(): Size & CheckMobile {
  const [windowSize, setWindowSize] = useState<Size>({
    sreenWidth: 0,
    heightWidth: 0,
  });
  const [xSMobileScreen, setXSMobileScreen] = useState(true);
  const [mobileScreen, setMobileScreen] = useState(true);
  const [tabletScreen, setTabletScreen] = useState(true);
  const [desktopScreen, setDesktopScreen] = useState(true);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        sreenWidth: window.innerWidth,
        heightWidth: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowSize?.sreenWidth && windowSize.sreenWidth <= XS_MOBILE_SCREEN) {
      setXSMobileScreen(true);
    } else {
      setXSMobileScreen(false);
    }

    if (windowSize?.sreenWidth && windowSize.sreenWidth <= MOBILE_SCREEN) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }

    if (windowSize?.sreenWidth && windowSize.sreenWidth <= TABLET_SCREEN) {
      setTabletScreen(true);
    } else {
      setTabletScreen(false);
    }
  }, [windowSize.sreenWidth]);

  useEffect(() => {
    setDesktopScreen(!mobileScreen && !tabletScreen && !xSMobileScreen);
  }, [tabletScreen, mobileScreen, xSMobileScreen]);

  return {
    sreenWidth: windowSize.sreenWidth,
    heightWidth: windowSize.heightWidth,
    mobileScreen,
    tabletScreen,
    desktopScreen,
    xSMobileScreen,
  };
}

export default useWindowSize;
