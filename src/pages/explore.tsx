import { ROUTE_PATH } from '@/constants/route-path';
import Artifacts from '@/containers/Artifacts';
import Layout from '@/layouts';
import { getAccessToken } from '@/utils/auth-storage';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import sessionStorage from '@/utils/sessionstorage';

const HomePage: NextPage = () => {
  const router = useRouter();
  const isLogin = getAccessToken();
  const [isLoading, setIsLoading] = useState(true);
  const firstTimeVisit = sessionStorage.get('firstTimeVisit');

  const handleRedirect = () => {
    if ((firstTimeVisit || firstTimeVisit === null) && !isLogin) {
      router.push(ROUTE_PATH.ABOUT);
      sessionStorage.set('firstTimeVisit', false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return <Layout>{!isLoading && <Artifacts />}</Layout>;
};

export default HomePage;
