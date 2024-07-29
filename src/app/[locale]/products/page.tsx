'use client'
import React, { useEffect, useRef } from 'react'
import { Empty, Button } from 'antd';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { queryMobileType, OPEN_TYPE, debounce } from '@/utils';
import QRCode from 'qrcode.react';
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import dynamic from 'next/dynamic';
import styles from './index.module.less'
import { addDownloadChannel } from '@/api'
import withSuspense from '@/hoc';


const Footer = withSuspense(dynamic(() => import('@/components/Footer'), { ssr: true }));
const UserGroup = withSuspense(dynamic(() => import('@/components/UserGroup'), { ssr: true }));
const IndustorySolutions = withSuspense(dynamic(() => import('@/components/IndustorySolutions'), { ssr: true }));


export default function Order() {
  const router = useRouter();
  const openType = useRef(queryMobileType())
  const t = useTranslations('global');
  const locale = useLocale();
  const isEn = locale === 'en'
  const appId = isEn ? '6472703992' : '6449456872';


  useEffect(() => {
    const data = { channel: 3, zhFlag: isEn ? 2 : 1 }
    const fetchAdd = async () => { await addDownloadChannel(data) };
    if (openType.current === OPEN_TYPE.IOS) {
      fetchAdd()
      let url = `https://apps.apple.com/app/id${appId}`
      window.location.href = url;
    } else if (openType.current === OPEN_TYPE.ANDROID) {
      fetchAdd()
      let url = isEn ? 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/apk/xiaoluo-overseas.apk' : 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/apk/xiaoluo-release.apk'
      window.location.href = url;
    }
  }, [])

  const messageWrapContainerStyle = {
    width: '100%',
    position: 'absolute',
    bottom: '-50px',
    left: '22vw',
    zIndex: '10000',
  }


  return (
    <Layout curActive='/products'>
      <main>
        <div className={styles['imageContainer']}>
          <Image
            src={isEn ? "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-24/d5bc8ae0-2b7d-4fc2-8ed0-fa1bd3c7b835.png" : "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-24/293ba438-46bf-47cd-a8e3-6d32be9c1c8e.png"}
            alt="bincial"
            width={1920}
            height={766}
            style={{ width: '100%' }}
            priority
            layout="responsive"
            className={styles.responsiveImage}
          />
          <div style={{ ...messageWrapContainerStyle }}>
            <div className={styles['messageWrap']} >

              <div className={styles['download']}>
                <div className={styles['downloadCol']}>
                  <div className={styles['downloadColBd']}>
                    <QRCode
                      id={String(Math.random() * 1000)}
                      value='https://xiaoluo.xiaoluoapp.com/web/#/h5/openAppLink?isEn=true'
                      size={65} // 二维码的大小
                      fgColor="#000000" // 二维码的颜色
                    />
                  </div>
                  <span className={styles.textDownload}>EN</span>
                </div>
                <div className={styles['downloadColRight']}>
                  <div className={styles['downloadColRightBd']}>
                    <QRCode
                      id={String(Math.random() * 1000)}
                      value='https://xiaoluo.xiaoluoapp.com/web/#/h5/openAppLink?isEn=false'
                      size={65} // 二维码的大小
                      fgColor="#000000" // 二维码的颜色
                    />
                  </div>
                  <span className={styles.textDownload}>CN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <IndustorySolutions />
        <UserGroup />
        <Footer />
      </main>
    </Layout>

  );
}
