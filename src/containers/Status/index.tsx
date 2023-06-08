import React from 'react';
import { StyledStatusPage } from './Status.styled';
import HistoryList from './HistoryList';
import { getAccessToken } from '@/utils/auth-storage';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';
import IconSVG from '@/components/IconSVG';
import { CDN_URL, TC_URL } from '@/configs';
import { DappsTabs } from '@/enums/tabs';

const StatusPage = () => {
  const router = useRouter();
  const hasToken = getAccessToken();

  if (!hasToken) {
    router.push(ROUTE_PATH.CONNECT_WALLET);
    return <></>;
  }

  return (
    <StyledStatusPage>
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
          <h1 className="pageTitle">Inscribing Status</h1>
          <p className="pageDescription">
            Check the <b>BIG FILE</b> status and inscribing process here.
            <br />
            For the file size under 350KB,{' '}
            <span
              onClick={() => window.open(`${TC_URL}?tab=${DappsTabs.ARTIFACT}`)}
              className="wallet-link"
            >
              go to Wallet{' '}
              <IconSVG
                src={`${CDN_URL}/icons/ic-arrow-outward.svg`}
                maxWidth="10"
                maxHeight="10"
                className="ic-outward"
              />
            </span>
          </p>
          <div className="listWrapper">
            <HistoryList />
          </div>
        </div>
      </div>
    </StyledStatusPage>
  );
};

export default StatusPage;
