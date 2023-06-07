import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '@/layouts';
import Inscription from '@/containers/Item';
import { ROUTE_PATH } from '@/constants/route-path';
import { SEO_TITLE } from '@/constants/seo';
import { BIG_FILE_PROJECT_ID } from '@/configs';

const InscriptionPage: NextPage = () => {
  return (
    <Layout>
      <Inscription />
    </Layout>
  );
};

export default InscriptionPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { query } = context;
    const { id } = query as { id: string };

    if (id === BIG_FILE_PROJECT_ID) {
      return {
        redirect: {
          permanent: false,
          destination: ROUTE_PATH.BIG_FILE_PROMO,
        },
      };
    }

    return {
      props: {
        seoInfo: {
          title: `${SEO_TITLE} | Inscription #${id} `,
        },
      },
    };
  } catch (err: unknown) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTE_PATH.NOT_FOUND,
      },
    };
  }
}
