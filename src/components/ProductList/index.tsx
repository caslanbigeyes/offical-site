'use client'


import React, { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import styles from './index.module.less';


export default function Index() {

  const t = useTranslations('global');
  const router = useRouter();
  const locale = useLocale();
  const [showIframe, setShowIframe] = useState(false);
  const isEn = locale === 'en'
  const widgets = [
    { label: t('productListELECTRICAL'), url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/6bc85acd-70f9-49f2-8730-8c1663479c6a.png' },
    { label: t('productListEQUIPMENT'), url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/b9920cb2-8317-46bb-b55b-ca6f1b13e5b4.png' },
    { label: t('productListPROCESSING'), url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/637548b4-2ff1-4b42-ae06-21475a5532cd.png' },
    { label: t('productListMACHINE TOOL'), url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/b8a053f6-aa07-474f-9105-ae74a0d68834.png' },
    { label: t('productListCOMPONENT'), url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/a71f6138-064b-488a-9b7d-e120ac0bc2de.png' },
    { label: t('productListCHIP'), url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/8a5f054e-9224-4cd6-89eb-16f4e7461ac9.png' },
    { label: t('productListSEMICONDUCTOR'), url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/a8830f8b-3bb3-42cb-8e24-1d78f93b46e4.png' },
    { label: t('productListCHEMICAL'), url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/bc9960f0-0744-44df-b97f-7d0b2d84a41e.png' },
  ]

  const products = [
    // { label: '永磁静音直流电机五重超静音', url: '/1@3x.png', des: t('proDes1'), address: t('addressCompany'), num: t('price'), uom: t('uom1'), linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3504&ts=1715241999589' },
    // { label: '商用级绕线收纳盘', url: '/2@3x.png', des: t('proDes2'), address: t('addressCompany'), num: t('price'), uom: '/个', linkUrl: "https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3505&ts=1715242015294" },
    // { label: '整机钢合金钣金', url: '/3@3x.png', des: t('proDes3'), address: t('addressCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3506&ts=1715242029329' },
    // { label: '全包钣金外壳耐用耐腐耐...', url: '/4@3x.png', des: t('proDes4'), address: t('addressCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3514&ts=1715242038481' },
    // { label: '永磁静音直流电机五重超静音', url: '/5@3x.png', des: t('proDes5'), address: t('addressCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3510&ts=1715242054681' },
    // { label: '永磁静音直流电机五重超静音', url: '/6@3x.png', des: t('proDes6'), address: t('addressCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3507&ts=1715242071988' },
    // { label: '永磁静音直流电机五重超静音', url: '/7@3x.png', des: t('proDes7'), address: t('addressCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3509&ts=1715242087641' },
    // { label: '永磁静音直流电机五重超静音', url: '/8@3x.png', des: t('proDes8'), address: t('addressCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3515&ts=1715242099188' },

    //  5/26 add
    { province: t('ycCompanyAddr'), url: '/ycpn1.png', des: t('ycProduct1'), address: t('ycCompany'), num: t('price'), uom: t('uom1'), linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3554&ts=1715241999589' },
    { province: t('ycCompanyAddr'), url: '/ycpn2.png', des: t('ycProduct2'), address: t('ycCompany'), num: t('price'), uom: '/个', linkUrl: "https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3553&ts=1715242015294" },
    { province: t('ycCompanyAddr'), url: '/ycpn3.png', des: t('ycProduct3'), address: t('ycCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3552&ts=1715242029329' },
    { province: t('ycCompanyAddr'), url: '/ycpn4.png', des: t('ycProduct4'), address: t('ycCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3545&ts=1715242038481' },

    { province: t('zqCompanyAddr'), url: '/zqpn1.png', des: t('zqProduct1'), address: t('zqCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3562&ts=1715242054681' },
    { province: t('zqCompanyAddr'), url: '/zqpn2.png', des: t('zqProduct2'), address: t('zqCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3563&ts=1715242071988' },
    { province: t('zqCompanyAddr'), url: '/zqpn3.png', des: t('zqProduct3'), address: t('zqCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3561&ts=1715242087641' },
    { province: t('zqCompanyAddr'), url: '/zqpn4.png', des: t('zqProduct4'), address: t('zqCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3560&ts=1715242099188' },

    { province: t('szCompanyAddr'), url: '/szpn1.png', des: t('szProduct1'), address: t('szCompany'), num: t('price'), uom: t('uom1'), linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3570&ts=1715241999589' },
    { province: t('szCompanyAddr'), url: '/szpn2.png', des: t('szProduct2'), address: t('szCompany'), num: t('price'), uom: '/个', linkUrl: "https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3571&ts=1715242015294" },
    { province: t('szCompanyAddr'), url: '/szpn3.png', des: t('szProduct3'), address: t('szCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3572&ts=1715242029329' },
    { province: t('szCompanyAddr'), url: '/szpn4.png', des: t('szProduct4'), address: t('szCompany'), num: t('price'), uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3573&ts=1715242038481' },

  ]



  const handlePush = (linkUrl: any) => {
    let url = `${linkUrl}&isEn=${isEn}`
    if (typeof (window as any).gtag === 'function') {
      window.gtag(url);
    }

    window.open(url, '_blank');
  }

  const wrapStyle = {
    width: '100%',
    background: ' #EAEFEB',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '100px',
    position: 'relative',
  }

  const titleStyle = {
    width: '100%',
    height: '50px',
    fontWeight: '600',
    fontSize: '36px',
    color: '#232D37',
    lineHeight: '50px',
    fontStyle: 'normal',
    marginTop: '70px',
    textAlign: 'center',
  }

  const widgetStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
    width: '1020px',
  }

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginRight: '18px',
    textAlign: 'center',
  }

  const imgProductWrapStyle = {
    width: '109px',
    height: '109px',
    textAlign: 'center',
  }

  const labelStyle = {
    width: '100%',
    height: '27px',
    fontStyle: 'normal',
    marginTop: '8px',
    whiteSpace: 'nowrap',
    /* 隐藏超出的文本 */
    overflow: 'hidden',
    /* 使用省略号表示超出的文本 */
    textOverflow: 'ellipsis',
    fontWeight: '400',
    fontSize: '15px',
    color: '#54575A',
    lineHeight: '27px',
    textAlign: 'center',
    fontStyle: 'normal',
  }

  const tipStyle = {
    width: '1020px',
    height: '33px',
    background: '#FFFFFF',
    marginTop: '30px',
    textAlign: 'center',
    lineHeight: '33px',
    borderRadius: '4px',
  }

  const conStyle = {
    height: '27px',
    fontFamily: 'PingFangSC, PingFang SC',
    fontWight: '400',
    fontSize: '14px',
    color: '#578B95',
    lineHeight: '27px',
    textAlign: 'left',
    fontStyle: 'normal',
  }

  const productsStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '1020px',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  }


  const imgProWrapStyle = {
    marginRight: '10px',
    marginTop: '23px',
    borderRadius: '8px',
    cursor: 'pointer',
  }

  const imgWrapStyle = {
    width: '243px',
    height: '243px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }


  const textWrapStyle = {
    width: '243px',
    height: '118px',
    background: '#FFFFFF',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  }

  const priceStyle = {
    padding: '10px 0px 2px 15px',
    width: '60px',
  }

  const inlineDes = {
    width: '243px',
    minHeight: '30px',
    background: '#FFFFFF',
    borderRadius: '8px',
    marginTop: '10px',
    // text-align: center;
    paddingLeft: '15px',
    fontWeight: '400',
    fontSize: '16px',
    color: '#333333',
    overflow: 'hidden',
    /* 使用省略号表示超出的文本，但这需要结合多行文本处理 */
    textOverflow: 'ellipsis',
    /* 不让单词在内部断开，但可能需要其他处理来避免文本溢出边界 */
    wordBreak: 'keep-all',

    /* 使用伪元素来实现多行文本省略号效果 */
    position: 'relative',
    display: '-webkit-box',
  }

  return (
    <>
      <section style={{ ...wrapStyle }}>
        <section style={{ ...titleStyle }}>{t('productList')}</section>
        <section style={{ ...widgetStyle }}>
          {
            widgets.map((i, index) => (
              <section key={i.url} style={{ ...itemStyle }} >
                <section style={{ ...imgProductWrapStyle }}>
                  <Image
                    loading="lazy"
                    src={i.url}
                    alt={`${i.label}`}
                    width={108}
                    height={108}
                  />
                </section>
                <section style={{ ...labelStyle }}>{i.label}</section>
              </section>
            ))
          }
        </section>

        {/* tip */}
        <section style={{ ...tipStyle }}>
          <span style={{ ...conStyle }}>
            {t('tip')}
          </span>
        </section>

        {/* product list */}
        <section style={{ ...productsStyle }}>
          {
            products.map((i, index) => (
              <section style={{ ...imgProWrapStyle, marginRight: (index === 3 || index === 7 || index === 11) ? 0 : '' }} className={styles.imgProWrapMy} key={i.url} onClick={() => handlePush(i.linkUrl)}>
                <section style={{ ...imgWrapStyle }}>
                  <Image
                    loading="lazy"
                    src={i.url}
                    alt="product"
                    width={243}
                    height={243}
                    style={{ borderRadius: '8px 8px 0 0' }}
                  />
                </section>
                <section style={{ ...textWrapStyle }}>
                  <section style={{ ...priceStyle }} />
                  <section className={styles.des} style={{ ...inlineDes }}>
                    {i.des}
                  </section>
                  <section className={styles.address}>
                    <section className={styles.icon}>{i.province}</section>
                    <section className={styles.afterText}>{i.address}</section>

                  </section>
                </section>
              </section>
            ))
          }

        </section>
      </section >
    </>
  )
}
