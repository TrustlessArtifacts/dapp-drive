import { GetServerSidePropsContext, NextPage } from 'next';
import Layout from '@/layouts';
import Inscription from '@/containers/Item';
import { ROUTE_PATH } from '@/constants/route-path';
import { SEO_IMAGE, SEO_TITLE } from '@/constants/seo';
import logger from '@/services/logger';
import { getNFTDetail } from '@/services/nft-explorer';
import { ARTIFACT_CONTRACT } from '@/configs';

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
    const { tokenId } = query as { tokenId: string };
    const data = await getNFTDetail({
      contractAddress: ARTIFACT_CONTRACT,
      tokenId,
    });

    return {
      props: {
        seoInfo: {
          title: `${SEO_TITLE} | Inscription #${tokenId} `,
          image: data?.image || SEO_IMAGE,
        },
      },
    };
  } catch (err: unknown) {
    logger.error(err);

    return {
      redirect: {
        permanent: false,
        destination: ROUTE_PATH.NOT_FOUND,
      },
    };
  }
}
