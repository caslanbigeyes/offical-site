'use client'
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { Empty, Button, List, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Layout from '@/components/Layout';
import styles from './index.module.less';
import dynamic from 'next/dynamic';
import withSuspense from '@/hoc';

const Footer = withSuspense(dynamic(() => import('@/components/Footer'), { ssr: true }));
const Faq = withSuspense(dynamic(() => import('./Faq'), { ssr: true }));
const VideoList = withSuspense(dynamic(() => import('./VideoList'), { ssr: true }));


const { SubMenu } = Menu;


export default function Order() {
  const t = useTranslations('global');
  const locale = useLocale();
  const isEn = locale === 'en'
  const router = useRouter();
  const [currentVideo, setCurrentVideo] = useState(null);
  const [selectedItem, setSelectedItem] = useState('item1');


  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };


  return (
    <Layout curActive='/help'>
      <main>
        <Image
          src="https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/67df7b8f-6b41-46f4-ba0d-e475bec48e2d.png"
          alt="bincial"
          width={1920}
          height={234}
          style={{ width: '100%' }}
          priority
        />
        <div className={styles['menu']}>
          <ul className={styles['menu-items']}>
            <li className={`${styles['menu-item']} ${selectedItem === 'item1' ? `${styles['selected']}` : ''}`} onClick={() => handleItemClick('item1')}>
              {t("USER GUIDE")}
            </li>
            <li className={`${styles['menu-item']} ${selectedItem === 'item2' ? `${styles['selected']}` : ''}`} onClick={() => handleItemClick('item2')}>
              {t("CERTIFICATION GUIDE")}
            </li>
            <li className={`${styles['menu-item']} ${selectedItem === 'item3' ? `${styles['selected']}` : ''}`} onClick={() => handleItemClick('item3')}>
              FAQ
            </li>
          </ul>

        </div>
        <div className={styles['content']}>
          {selectedItem === 'item1' && <div><VideoList /></div>}
          {selectedItem === 'item2' && <div className={styles['certification-guide']}>
            <Image
              src={isEn ? 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/03607c83-b180-4b15-9614-9387925f823a.png' : "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/19db0c77-e78c-49e1-a168-095704cd773f.png"}
              alt="bincial"
              width={1032}
              height={617}
              style={{ width: '100%' }}
              priority
            />
            <Image
              src={isEn ? 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/bc8bcc46-3e68-4961-a052-1aa63545e905.png' : "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/6929bc3c-6f23-4c98-9170-5ba340246b95.png"}
              alt="bincial"
              width={1032}
              height={617}
              style={{ width: '100%' }}
              priority
            />
          </div>}
          {selectedItem === 'item3' && <div><Faq /></div>}
        </div>
        <Footer />
      </main>
    </Layout>

  );
}
