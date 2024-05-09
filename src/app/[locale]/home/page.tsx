'use client'
import React from 'react'
import { Carousel } from 'antd';
import Layout from '@/components/Layout';
import Image from "next/image";
import styles from './index.module.less'
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const ProductDescription = dynamic(() => import('@/components/ProductDescription'), { ssr: false });
const ProductList = dynamic(() => import('@/components/ProductList'), { ssr: false });


export default function Index() {
  return (
    <Layout curActive='/home'>
      <Carousel waitForAnimate infinite={false} arrows={true} autoplay={true} className="carousel">
        <Image
          src="/homeBg.png"
          alt="bincial"
          width={1920}
          height={766}
          style={{ borderRadius: 6 }}
          priority
        />
        <Image
          src="/homeBg.png"
          alt="bincial"
          width={1920}
          height={766}
          style={{ borderRadius: 6 }}
          priority
        />
        <Image
          src="/homeBg.png"
          alt="bincial"
          width={1920}
          height={766}
          style={{ borderRadius: 6 }}
          priority
        />
      </Carousel>
      <div className={styles['message']}>
        <div className={styles['tip']}>
          【近期上新】
        </div>
        <div className={styles['con']}>
          <div className={styles['conLeft']}>
            吉特迈集团全球领先的机床制造商，对创新追求不断，对生产和物流不断优化，造就2024最新款金属切削机床。
          </div>
          <div className={styles['conRight']}>
            立即查看
          </div>
        </div>
      </div>
      <ProductDescription />
      <ProductList />
      <Contact />
      <Footer />
    </Layout>
  )
}
