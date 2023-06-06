import React from 'react';
import { StyledStatusPage } from './Status.styled';
import HistoryList from './HistoryList';
import { getAccessToken } from '@/utils/auth-storage';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@/constants/route-path';

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
          <h1 className="pageTitle">Smart Inscription status</h1>
          <p className="pageDescription">
            Check the status and history of your preservations here.
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
