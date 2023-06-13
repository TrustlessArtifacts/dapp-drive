import Artifacts from '@/containers/Artifacts';
import Layout from '@/layouts';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Artifacts />
    </Layout>
  );
};

export default HomePage;
