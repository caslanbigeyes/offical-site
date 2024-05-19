'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { Layout, Menu, theme, Avatar, Dropdown, Modal, ConfigProvider, Badge, Popover, type MenuProps, Col, Row, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import GetNavList from './menu';
import { CloseOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { useLocale, useTranslations } from 'next-intl';
import {
  BellOutlined,
  MoonOutlined,
  SunOutlined
} from '@ant-design/icons';
import { getThemeBg } from '@/utils';
import { Link as CNLink, pathnames, usePathname } from '../../navigation';
import logo from '../../../public/logo.png';
import Image from "next/image";
import styles from './index.module.less';

const { Header, Content, Sider } = Layout;

const style = {
  background: `url(${logo.src}) no-repeat center center fixed`,
  // 其他样式...
};
interface IProps {
  children: React.ReactNode,
  curActive: string,
  defaultOpen?: string[]
}

const CommonLayout: React.FC<IProps> = ({ children, curActive, defaultOpen = ['/'] }) => {
  const {
    token: { borderRadiusLG, colorTextBase, colorWarningText },
  } = theme.useToken();

  const t = useTranslations('global');
  const navList = GetNavList(t);
  const locale = useLocale();
  const otherLocale: any = locale === 'en' ? ['zh', 'CN'] : ['en', 'EN'];
  const router = useRouter();
  const pathname = usePathname();
  const [curTheme, setCurTheme] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  // const screenWidthFlag = window.innerWidth > 767;
  const screenWidthFlag = (document.documentElement.clientWidth || document.body.clientWidth) > 767;
  const [isMenuFolded, setIsMenuFolded] = useState(false); // 初始状态为折叠  

  const toggleTheme = () => {
    setCurTheme(prev => !prev);
  }

  const toggleMenu = () => {
    setIsMenuFolded(!isMenuFolded);
  };

  const handleDownload = () => {
    setVisible(true);
  }

  const renderMenuItems = () => (
    <div className={styles[!screenWidthFlag ? 'line' : "noline"]}>
      <Link prefetch={false} className={('/home').includes(curActive) ? styles['active'] : styles['LineLink']}
        href="/home" >{t("home page")}</Link>
      <Link prefetch={false} className={('/products').includes(curActive) ? styles['active'] : styles['LineLink']}
        href="/products" >{t("products and services")}</Link>
      <Link prefetch={false} className={('/about').includes(curActive) ? styles['active'] : styles['LineLink']}
        href="/about"  >{t("about us")}</Link>
      <Link prefetch={false} className={('/help').includes(curActive) ? styles['active'] : styles['LineLink']}
        href="/help"   >{t("help center")}</Link>
    </div>
  );

  const renderLocaleSwitch = () => (
    <>
      <CNLink
        rel='preload'
        href={pathname}
        locale={otherLocale[0]}
        className={styles.i18n}
      >
        {otherLocale[1]}
      </CNLink>

      <Dropdown
        overlay={
          <Image
            src="/App.png"
            alt="bincial"
            width={69}
            height={69}
            // style={{ borderRadius: 6 }}
            priority
          />
        }
        trigger={['click', 'hover']} // 点击和hover都会触发  
        placement="bottomLeft" // 悬浮位置  
      >
        <span className={styles['download-btn']}>
          {t("Download")}
        </span>
      </Dropdown>
    </>
  );

  // 渲染折叠/展开图标  
  const renderToggleIcon = () => (
    <span
      className={styles['toggle-icon']}
      onClick={toggleMenu}
      style={{
        transform: `rotate(${isMenuFolded ? '0deg' : '180deg'})`, // 控制旋转  
      }}
    >
      {isMenuFolded ? <CloseOutlined className={styles['icon-size']} /> : <MenuFoldOutlined className={styles['icon-size']} />}
    </span>
  );

  // 控制菜单是否折叠的样式  
  const menuClassName = `${styles['wrap-menu']} ${isMenuFolded ? styles['folded'] : ''}`;

  const handleSelect = (row: { key: string }) => {
    if (!screenWidthFlag) {
      setIsMenuFolded(!isMenuFolded)
    }
    router.push(row.key)
  }

  const handleScreenAuto = () => {
    const designDraftWidth = 1920;//设计稿的宽度
    const designDraftHeight = 960;//设计稿的高度
    //根据屏幕的变化适配的比例
    const scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designDraftWidth / designDraftHeight ?
      (document.documentElement.clientWidth / designDraftWidth) :
      (document.documentElement.clientHeight / designDraftHeight);
    (document.querySelector('#screen') as any).style.transform = `scale(${scale}) translate(-50%)`;
  }

  useEffect(() => {
    const handleResize = () => handleScreenAuto();
    if (screenWidthFlag) {
      window.addEventListener('resize', handleResize);
    }
    // 调用 handleScreenAuto 初始化  
    handleScreenAuto();
    return () => {
      // 移除事件监听器  
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  // useEffect(() => {
  //   if (pathname !== "/about") {
  //     // 获取id为"sticky-nav"的元素  
  //     const stickyNav = document.getElementById('sticky-nav');

  //     // 检查元素是否存在  
  //     if (stickyNav && stickyNav.parentNode) {
  //       // 从其父节点中移除stickyNav元素  
  //       stickyNav.parentNode.removeChild(stickyNav);
  //     }
  //   }
  // }, [])


  return (
    <ConfigProvider
      theme={{
        algorithm: curTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >

      <Layout>

        <Header style={{ ...getThemeBg(curTheme), position: 'fixed', width: '100%', zIndex: 1000 }}>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-S0T16HCKN9" />
          <script dangerouslySetInnerHTML={{
            __html: `  
              window.dataLayer = window.dataLayer || [];  
              function gtag(){dataLayer.push(arguments);}  
              gtag('js', new Date());  
              gtag('config', 'G-S0T16HCKN9');  
            `,
          }} />
          <Row style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
            <Col xs={11} sm={11} md={11} lg={11} xl={11}>
              <Image
                src={locale === 'en' ? "/logoEn.png" : '/logo.png'}
                alt="bincial"
                width={locale === 'en' ? 121 : 160}
                height={29}
                style={{ borderRadius: 6, display: 'block', margin: '0 auto' }}
                priority
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} offset={1}>
              <div className={styles[locale === 'en' ? 'rightControl' : 'changeRight']}>
                {!screenWidthFlag ? renderToggleIcon() : null}
                {screenWidthFlag &&
                  <>
                    {renderMenuItems()}
                    {renderLocaleSwitch()}
                  </>

                }
              </div>
            </Col>
          </Row>
          {(!screenWidthFlag && isMenuFolded) ? <div className={styles['line']}>
            <Link prefetch={false} className={[['/home'].includes(curActive) ? styles['active'] : '', styles['line-a'], isMenuFolded ? styles.expand : styles.collapseUp].join(' ')}
              href="/home" >{t("home page")}</Link>
            <Link prefetch={false} className={[['/products'].includes(curActive) ? styles['active'] : '', styles['line-a'], isMenuFolded ? styles.expand : styles.collapseUp].join(' ')}
              href="/products" >{t("products and services")}</Link>
            <Link prefetch={false} className={[['/about'].includes(curActive) ? styles['active'] : '', styles['line-a'], isMenuFolded ? styles.expand : styles.collapseUp].join(' ')}
              href="/about"  >{t("about us")}</Link>
            <Link prefetch={false} className={[['/help'].includes(curActive) ? styles['active'] : '', styles['line-a'], isMenuFolded ? styles.expand : styles.collapseUp].join(' ')}
              href="/help"   >{t("help center")}</Link>
            <div className={[['/help'].includes(curActive) ? styles['active'] : '', styles['line-a'], isMenuFolded ? styles.expand : styles.collapseUp].join(' ')}
              onClick={() => handleDownload()}  >{t("Download")}</div>
            <CNLink
              prefetch={false}
              className={[styles['line-a'], isMenuFolded ? styles.expand : styles.collapseUp].join(' ')}
              href={pathname}
              locale={otherLocale[0]}

            >
              {otherLocale[1]}
            </CNLink>
          </div>
            : null}
        </Header>
        <Content style={{ margin: '60px  0 0', position: 'relative' }}>
          <Suspense fallback={'loading'}>
            <div className={styles['screen']} id="screen">
              {
                children
              }
            </div>
          </Suspense>
        </Content>

        <Modal
          visible={visible}
          footer={null}
          onCancel={() => {
            setVisible(false);
            setIsMenuFolded(false)
          }}
          centered
          style={{ textAlign: 'center' }}
        >
          <Image
            src="/App.png"
            alt="bincial"
            width={69}
            height={69}
            priority
          />
        </Modal>
      </Layout>
    </ConfigProvider >
  );

};


export default CommonLayout;