import { NextPage } from 'next';
import Layout from '@/layouts';
import Inscription from '@/containers/Item';

const InscriptionPage: NextPage = () => {
  return (
    <Layout>
      <Inscription />
    </Layout>
  );
};

export default InscriptionPage;
