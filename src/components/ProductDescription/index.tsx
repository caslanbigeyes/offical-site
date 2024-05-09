'use client'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import styles from './index.module.less'
export default function Index() {

  const t = useTranslations('global');


  const productList = [{
    url: '/product.png',
    text: t('product1'),
    describe: t('productDescriptionDes1'),
  },
  {
    url: '/product2.png',
    text: t('product2'),
    describe: t('productDescriptionDes2'),
  },
  {
    url: '/product3.png',
    text: t('product3'),
    describe: t('productDescriptionDes3'),
  },
  {
    url: '/product4.png',
    text: t('product4'),
    describe: t('productDescriptionDes4'),
  }]


  return (
    <div className={styles.bg}>
      <div className={styles.top}>
        {productList.map(i => {
          return (
            <div className={styles.box} key={i.url}>
              <Image
                src={i.url}
                alt="product"
                width={83}
                height={83}
                priority
              />
              <div className={styles.text}> {i.text}</div>
              <div className={styles.des}> {i.describe}</div>
            </div>
          )
        })}
      </div>

      <div className={styles.bottom}>
        <div style={{ width: '100%' }}>
          <Image
            src='/img1.png'
            alt="product"
            width={702}
            height={310}
            priority
            style={{ marginRight: '20px', maxWidth: '100%', height: 'auto' }}
          />
          <Image
            src='/img2.png'
            alt="product"
            width={310}
            height={310}
            priority

          />
        </div>
        <div style={{ width: '100%' }}>
          <Image
            src='/img3.png'
            alt="product"
            width={310}
            height={310}
            priority
            style={{ marginRight: '20px', maxWidth: '100%', height: 'auto' }}

          />
          <Image
            src='/img4.png'
            alt="product"
            width={702}
            height={310}
            priority
            style={{ marginTop: '20px' }}
          />
        </div>
      </div>
    </div>
  )
}
