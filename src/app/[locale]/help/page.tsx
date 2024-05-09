'use client'
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { Empty, Button, List, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Layout from '@/components/Layout';
import styles from './index.module.less';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Faq = dynamic(() => import('./Faq'), { ssr: false });
const VideoList = dynamic(() => import('./VideoList'), { ssr: false });


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
          src="/helpCenter.png"
          alt="bincial"
          width={1920}
          height={234}
          style={{ borderRadius: 6, width: '100%' }}
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
              src={isEn ? '/helpGuide1.png' : "/guide1.png"}
              alt="bincial"
              width={1032}
              height={617}
              style={{ borderRadius: 6, width: '100%' }}
              priority
            />
            <Image
              src={isEn ? '/helpGuide2.png' : "/guide2.png"}
              alt="bincial"
              width={1032}
              height={617}
              style={{ borderRadius: 6, width: '100%' }}
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
