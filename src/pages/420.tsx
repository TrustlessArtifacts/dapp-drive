import { ARTIFACT_CONTRACT, BIG_FILE_PROJECT_ID } from '@/configs';
import { ROUTE_PATH } from '@/constants/route-path';
import { SEO_TITLE } from '@/constants/seo';
import Inscription from '@/containers/Item/Inscription';
import { IInscription } from '@/interfaces/api/inscription';
import Layout from '@/layouts';
import { getNFTDetail } from '@/services/nft-explorer';
import React from 'react';

const Inscription420Page = ({ inscription }: { inscription: IInscription }) => {
  return (
    <Layout>
      <Inscription data={inscription} />
    </Layout>
  );
};

export default Inscription420Page;

export async function getServerSideProps() {
  try {
    const data = await getNFTDetail({
      contractAddress: ARTIFACT_CONTRACT,
      tokenId: BIG_FILE_PROJECT_ID,
    });
    return {
      props: {
        inscription: data,
        seoInfo: {
          title: `${SEO_TITLE} | Inscription #${data.tokenId} `,
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
