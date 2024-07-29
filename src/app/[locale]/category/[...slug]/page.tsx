import Layout from '@/components/Layout';

import Nav from '@/components/Nav';

import styles from './index.module.less'
import { recommendProductsInfo, getSearchInfo, getRecommendKeyWord, getCityInfo, getCertificateInfo } from '@/app/api/shop';

const contentStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export default async function test({ params }) {
  try {
    const projects = await recommendProductsInfo(params.locale);
    const searchInfo = await getSearchInfo(params.locale);
    const recommendKeyWord = await getRecommendKeyWord(params.locale);
    const certificateInfo = await getCertificateInfo(params.locale);
    const cityInfo = await getCityInfo(params.locale);



    return (
      <Layout curActive='/category' >
        <div style={{ ...contentStyle }}>
          <Nav searchInfo={searchInfo?.data} recommendKeyWord={recommendKeyWord?.data} params={params} projects={projects} certificateInfo={certificateInfo} cityInfo={cityInfo} />
        </div>

      </Layout>
    );
  } catch (error) {
    console.error('Error in test function:', error);
    return (
      <ul>
        Error occurred: {error.message}
      </ul>
    );
  }
}
