import { NextPage } from 'next';
import ConnectWallet from '@/containers/ConnectWallet';
import Layout from '@/layouts';

const ConnectWalletPage: NextPage = () => {
  return (
    <Layout>
      <ConnectWallet />
    </Layout>
  );
};

export default ConnectWalletPage;
