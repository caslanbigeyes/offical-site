import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { Tag } from 'antd';
import { useRouter } from 'next/navigation';

import Image from "next/image";
import styles from './index.module.less';
import { url } from 'inspector';


export default function Index() {

  const t = useTranslations('global');
  const router = useRouter();


  const widgets = [
    { label: t('productListELECTRICAL'), url: '/pl1.png' },
    { label: t('productListEQUIPMENT'), url: '/pl2.png' },
    { label: t('productListPROCESSING'), url: '/pl3.png' },
    { label: t('productListMACHINE TOOL'), url: '/pl4.png' },
    { label: t('productListCOMPONENT'), url: '/pl5.png' },
    { label: t('productListCHIP'), url: '/pl6.png' },
    { label: t('productListSEMICONDUCTOR'), url: '/pl7.png' },
    { label: t('productListCHEMICAL'), url: '/pl8.png' },
  ]

  const products = [
    { label: '永磁静音直流电机五重超静音', url: '/pro1.png', des: t('ELECTRICAL'), address: t('address1'), num: 17, uom: t('uom1'), linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3504&ts=1715241999589' },
    { label: '商用级绕线收纳盘', url: '/pro2.png', des: t('ELECTRICAL'), address: t('address1'), num: 17, uom: '/个', linkUrl: "https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3505&ts=1715242015294" },
    { label: '整机钢合金钣金', url: '/pro3.png', des: t('ELECTRICAL'), address: t('address1'), num: 17, uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3506&ts=1715242029329' },
    { label: '全包钣金外壳耐用耐腐耐...', url: '/pro4.png', des: t('ELECTRICAL'), address: t('address1'), num: 17, uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3514&ts=1715242038481' },
    { label: '永磁静音直流电机五重超静音', url: '/pro5.png', des: t('ELECTRICAL'), address: t('address1'), num: 17, uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3510&ts=1715242054681' },
    { label: '永磁静音直流电机五重超静音', url: '/pro6.png', des: t('ELECTRICAL'), address: t('address1'), num: 17, uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3507&ts=1715242071988' },
    { label: '永磁静音直流电机五重超静音', url: '/pro7.png', des: t('ELECTRICAL'), address: t('address1'), num: 17, uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3509&ts=1715242087641' },
    { label: '永磁静音直流电机五重超静音', url: '/pro8.png', des: t('ELECTRICAL'), address: t('address1'), num: 17, uom: '/个', linkUrl: 'https://xiaoluo.xiaoluoapp.com/web/#/h5/product?id=3515&ts=1715242099188' },
  ]

  const handlepPush = (linkUrl) => {
    router.push(linkUrl)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{t('productList')}</div>

      {/* widget */}
      <div className={styles.widget}>
        {
          widgets.map((i, index) => (
            <div key={i.url} className={styles.item} >
              <div className={styles.imgProductWrap}>
                <Image
                  src={i.url}
                  alt="product"
                  width={69}
                  height={69}
                  priority
                  style={{ background: '#ffffff' }}
                />
              </div>
              <div className={styles.label}>{i.label}</div>
            </div>
          ))
        }
      </div>

      {/* tip */}
      <div className={styles.tip}>
        <span className={styles.con}>
          {t('tip')}
        </span>
      </div>

      {/* product list */}
      <div className={styles.products}>
        {
          products.map(i => (
            <div style={{ marginTop: '23px' }} key={i.url} onClick={()=>handlepPush(i.linkUrl)}>
              <div className={styles.imgWrap}>
                <Image
                  src={i.url}
                  alt="product"
                  width={180}
                  height={180}
                  priority
                />
              </div>
              <div className={styles.textWrap}>
                <div className={styles.price}>
                  <span className={styles.num}>{i.num}</span>
                  <span className={styles.uom}>{i.uom}</span>

                </div>
                <div className={styles.des}>
                  {i.des}
                </div>
                <div className={styles.address}>
                  <div className={styles.icon}>上海</div>
                  <div className={styles.afterText}>{i.address}</div>

                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}
