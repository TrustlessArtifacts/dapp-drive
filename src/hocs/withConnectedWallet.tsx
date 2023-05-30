import { ROUTE_PATH } from '@/constants/route-path';
import { getAuthStorage } from '@/utils/auth-storage';
import { useRouter } from 'next/router';
import { useEffect, ComponentType } from 'react';

const withConnectedWallet = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const WithConnectedWallet: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const authInfo = getAuthStorage();
      const hasAccessToken = !!authInfo;

      if (!hasAccessToken) {
        router.push(ROUTE_PATH.CONNECT_WALLET);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithConnectedWallet;
};

export default withConnectedWallet;
