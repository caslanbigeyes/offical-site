'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { Layout, Dropdown, Col, Row } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import dynamic from 'next/dynamic';
import Link from "next/link";
import QRCode from 'qrcode.react';
import { Link as CNLink, pathnames, usePathname } from '../../navigation';
import styles from './index.module.less';
import withSuspense from '@/hoc';


const MultiLevelMenu = withSuspense(dynamic(() => import('@/components/MultiLevelMenu'), { ssr: false }));


interface IProps {
  children: React.ReactNode,
  curActive: string,
  defaultOpen?: string[]
}

const CommonLayout: React.FC<IProps> = ({ children, curActive, defaultOpen = ['/home'] }) => {
  const { Header, Content } = Layout;
  const pathname = usePathname();
  const t = useTranslations('global');
  const locale = useLocale();
  const otherLocale: any = locale === 'en' ? ['zh', 'CN'] : ['en', 'EN'];
  return (
    <Layout>
      <Header className={styles['fixHeader']}>
        <div className={styles['myHeader']}>
          <div className={styles['changeLeft']}>
            <Link href='/home' prefetch={false}>
              <Image
                priority
                src={'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-23/12713912-ec5a-4d92-8c43-5dad31642cb7.png'}
                alt="bincial"
                width={121}
                height={29}
                className={styles['myLogo']}
              />
            </Link>
          </div>
          <nav className={styles['changeRight']}>
            <div className={styles["noLine"]}>
              <Link prefetch={false} className={('/home').includes(curActive) ? styles['active'] : styles['LineLink']}
                href="/home" >{t("home page")}</Link>
              <Dropdown overlay={<MultiLevelMenu />} trigger={['hover']} placement="bottomRight" style={{ width: '500px' }} className={styles['dropdown']}>
                <Link prefetch={true} className={('/shop').includes(curActive) ? styles['active'] : styles['LineLink']}
                  href="/shop" >{t("shop")}</Link>
              </Dropdown>
              <Link prefetch={false} className={('/products').includes(curActive) ? styles['active'] : styles['LineLink']}
                href="/products" >{t("products and services")}</Link>
              <Link prefetch={false} className={('/about').includes(curActive) ? styles['active'] : styles['LineLink']}
                href="/about"  >{t("about us")}</Link>
              <Link prefetch={false} className={('/help').includes(curActive) ? styles['active'] : styles['LineLink']}
                href="/help"   >{t("help center")}</Link>
            </div>
            <CNLink
              href={pathname}
              locale={otherLocale[0]}
              className={styles.i18n}
            >
              {otherLocale[1]}
            </CNLink>

            <Dropdown
              overlay={
                <>
                  <div className={styles['download']}>
                    <div className={styles['downloadCol']}>
                      <div className={styles['downloadColBd']}>
                        <QRCode
                          id={String(Math.random() * 1000)}
                          value='https://xiaoluo.xiaoluoapp.com/web/#/h5/openAppLink?isEn=true'
                          size={105} // 二维码的大小
                          fgColor="#000000" // 二维码的颜色
                        />
                      </div>
                      <span>EN</span>
                    </div>
                    <div className={styles['downloadColRight']}>
                      <div className={styles['downloadColRightBd']}>
                        <QRCode
                          id={String(Math.random() * 1000)}
                          value='https://xiaoluo.xiaoluoapp.com/web/#/h5/openAppLink?isEn=false'
                          size={105} // 二维码的大小
                          fgColor="#000000" // 二维码的颜色
                        />
                      </div>
                      <span>CN</span>
                    </div>
                  </div>
                </>
              }
              trigger={['click', 'hover']} // 点击和hover都会触发  
              placement="bottomLeft" // 悬浮位置  
            >
              <span className={styles['download-btn']}>
                {t("Download")}
              </span>
            </Dropdown>
          </nav>
        </div>
      </Header>

      <Content className={styles['myContent']}>
        <Suspense fallback={<p style={{ textAlign: 'center', height: '100vh', background: '#fff' }}>Loading feed...</p>}>
          <main>
            {
              children
            }
          </main>
        </Suspense>
      </Content>
    </Layout>
  );

};


export default CommonLayout;