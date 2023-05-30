import { NextPage } from 'next';
import Layout from '@/layouts';
import History from '@/containers/History';
import withConnectedWallet from '@/hocs/withConnectedWallet';

const HistoryPage: NextPage = () => {
  return (
    <Layout>
      <History />
    </Layout>
  );
};

export default withConnectedWallet(HistoryPage);
