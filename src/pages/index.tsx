import { NextPage } from 'next';
import Layout from '@/layouts';
import Artifacts from '@/containers/Artifacts';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Artifacts />
    </Layout>
  );
};

export default HomePage;
