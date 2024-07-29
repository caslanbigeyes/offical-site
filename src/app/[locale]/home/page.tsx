'use client'
import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Carousel } from 'antd';
import { useTranslations } from 'next-intl';
import Layout from '@/components/Layout';
import Image from "next/image";
import { Spin } from 'antd';
import { LeftOutlined, RightOutlined, LoadingOutlined, FastForwardFilled } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { queryImages } from '@/api';
import withSuspense from '@/hoc';

const Footer = withSuspense(dynamic(() => import('@/components/Footer'), { ssr: false, }));
const Contact = withSuspense(dynamic(() => import('@/components/Contact'), { ssr: false, }));
const ProductDescription = withSuspense(dynamic(() => import('@/components/ProductDescription'), { ssr: false, }));
const ProductList = withSuspense(dynamic(() => import('@/components/ProductList'), { ssr: false, }));




export default function Index() {
  console.log('home页面')
  const t = useTranslations('global');
  const [activeIndex, setActiveIndex] = useState(0);
  let carouselRef = useRef();


  const handleChange = (index) => {
    setActiveIndex(index)
  }

  const images = [
    {
      url: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3504&ts=1715241999589',
      src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/ddd15a16-ed14-4bbd-8c28-0bd05c3afd0c.png', title: 11, content: 23222
    },
    {
      url: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3504&ts=1715241999589',
      src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', title: 11, content: 23222
    },
    {
      url: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3504&ts=1715241999589',
      src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/c38b5eb2-1e72-44ff-af16-367fde21b5ca.png', title: 11, content: 23222
    },
    { src: "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/927fb87c-103c-4f3d-80b7-16d1c9b16a7d.png" }]




  const cities = [
    {
      id: 0,
      cityName: "yancheng",
      productName: "yanchengPro",
      productUrl: "https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3553&ts=1715241999589",
    },
    {
      id: 1,
      cityName: "nanjing",
      productName: "nanjingPro",
      productUrl: "https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3562&ts=1715241999589"
    },
    {
      id: 2,
      cityName: "shenzhen",
      productName: "shenzhenPro",
      productUrl: "https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3569&ts=1715241999589"
    },
    {
      id: 3,
      cityName: "newOn",
      productName: "newCon",
      productUrl: "https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3504&ts=1715241999589"

    }
  ];

  const next = () => {
    carouselRef.next();
  };

  const prev = () => {
    carouselRef.prev();
  };

  const cityMessageStyle = {
    width: '100%',
    position: 'absolute',
    bottom: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const messageStyle = {
    width: '1031px',
    height: '121px',
    opacity: '0.89',
    background: '#FFFFFF',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '18px 26px',
    position: 'absolute',
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '0',
    paddingBottom: '40%', // (766 / 1920) * 100%
  };

  const conStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4px',
  };

  const tipStyle = {
    width: '132px',
    height: '30px',
    fontFamily: 'PingFangSC, PingFang SC',
    fontWeight: '400',
    fontSize: '22px',
    color: '#3F86FF',
    lineHeight: '30px',
    textAlign: 'left',
    fontStyle: 'normal',
    marginLeft: '-12px',
    whiteSpace: 'nowrap',
  };

  const conLeftStyle = {
    width: '849px',
    height: '58px',
    fontFamily: 'PingFangSC, PingFang SC',
    fontWeight: '300',
    fontSize: '19px',
    color: '#1F303C',
    lineHeight: '29px',
    textAlign: 'left',
    fontStyle: 'normal',
    overflow: 'hidden',
    wordBreak: 'keep-all',
    textOverflow: 'ellipsis',
  };

  const conRightStyle = {
    width: '89px',
    height: '34px',
    background: '#3F86FF',
    borderRadius: '17px',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: '34px',
    cursor: 'pointer',
  };

  const CityMessage = ({ city }) => {
    return (
      <section style={{ ...cityMessageStyle }}>
        <section style={{ ...messageStyle }}>
          <strong style={{ ...tipStyle }}>
            {t(city.cityName)}
          </strong>
          <section style={{ ...conStyle }}>
            <strong style={{ ...conLeftStyle }}>
              {t(city.productName)}
            </strong>
            {city.productUrl && (
              <section style={{ ...conRightStyle }} onClick={() => window.open(city.productUrl, '_blank')}>
                {t("newView")}
              </section>
            )}
          </section>
        </section>
      </section>
    );
  }


  return (
    <>
      <Layout curActive='/home'>
        <main style={{ position: 'relative', display: 'block' }}>
          <Carousel ref={(node) => (carouselRef = node)} autoplaySpeed={4000} dotPosition="bottom" dots afterChange={handleChange} waitForAnimate infinite arrows autoplay >
            {images.map(item => (
              <section key={item.src} style={{ ...imageContainerStyle }}>
                <Image
                  priority
                  layout="responsive"
                  key={item.src}
                  src={item.src}
                  alt="bincial"
                  width={1920}
                  height={766}
                />
              </section>
            ))}
          </Carousel>

          <Image
            loading="lazy"
            onClick={prev}
            style={{
              position: 'absolute',
              top: '45%',
              left: '100px',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#fff',
              zIndex: 1
            }}
            src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/1797ff75-1403-43bd-b6eb-d706d541c026.png'
            alt="bincial"
            width={70}
            height={70}
          />
          <Image
            loading="lazy"
            onClick={next}
            style={{
              position: 'absolute',
              top: '45%',
              right: '100px',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#fff',
              zIndex: 1
            }}
            src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/85e88ac2-9e79-4dba-8573-60ff7516a864.png'
            alt="bincial"
            width={70}
            height={70}
          />

          {cities.map((city) => (
            activeIndex === city.id && <CityMessage key={city.id} city={city} />
          ))}

        </main>


        <ProductDescription />
        <ProductList />
        <Contact />
        <Footer />
      </Layout>
    </>

  )
}
