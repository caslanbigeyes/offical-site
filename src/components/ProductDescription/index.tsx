'use client'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import styles from './index.module.less'


export default function Index() {
  const t = useTranslations('global');
  const locale = useLocale();
  const isEn = locale === 'en'

  const productList = [{
    url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/77c25e8f-8767-4286-937b-27556194d26f.png',
    text: t('product1'),
    describe: t('productDescriptionDes1'),
    describe2: t('productDescriptionDes1W'),

  },
  {
    url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/746b7e0f-ac79-41c6-9370-f18a3a50e691.png',
    text: t('product2'),
    describe: t('productDescriptionDes2'),
    describe2: t('productDescriptionDes2W'),

  },
  {
    url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/ab13abdf-4865-4b2e-bbc5-2d54835e05cd.png',
    text: t('product3'),
    describe: t('productDescriptionDes3'),
    describe2: t('productDescriptionDes3W'),

  },
  {
    url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/6966ba16-ca9f-47a9-b8fd-8efec01c2f8c.png',
    text: t('product4'),
    describe: t('productDescriptionDes4'),
    describe2: t('productDescriptionDes4W'),

  }]

  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '243px',
    height: '285px',
    backgroundColor: '#ffffff',
    marginRight: '20px',
    alignItems: 'center',
    padding: '13px',
    borderRadius: '8px',
    boxShadow: ' 0px 8px 20px 0px rgba(0, 0, 0, 0.05)',
  }

  const desStyle = {
    fontWeight: '300',
    fontSize: '18px',
    color: '#999999',
    linHeight: '29px',
    textAlign: 'center',
    fontStyle: 'normal',
    marginTop: '10px',
    minWidth: '227px',
  }

  const textStyle = {
    fontWeight: '400',
    fontSize: '22px',
    color: '#333333',
    lineHeight: '30px',
    textAlign: 'left',
    fontStyle: 'normal',
    marginTop: '24px',
  }


  const bottomStyle = {
    width: '100%',
    height: '842px',
    minWidth: "1080px",
    background: ' #FFFFFF',
    textAlign: 'center',
    padding: '100px 0'
  }

  return (
    <section className={styles.bg} style={{
      height: '1327px',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}>
      <section className={styles.top} style={{
        background: ' #fbfbfb',
        display: ' flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '100px 0',
        width: '100%',
        height: '485px'
      }}>
        {productList.map(i => {
          return (
            <section style={{ ...boxStyle }} key={i.url}>
              <Image
                priority
                src={i.url}
                alt={`${i.describe}`}
                width={83}
                height={83}
              />
              <section style={{ ...textStyle }}> {i.text}</section>
              {isEn ? <section style={{ ...desStyle }}> {i.describe}</section> : <section className={styles.des}> {i.describe}<section>{i.describe2}</section></section>}
            </section>
          )
        })}
      </section>

      <section style={{ ...bottomStyle }}>
        <section style={{ width: '100%' }}>
          <Image
            priority
            src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-27/64d7e3bf-221d-4047-9ff4-0a28fe4070ed.png'
            alt="product"
            width={702}
            height={310}
            className={styles['imgWrap']}
            style={{ marginRight: '1.25rem', maxWidth: '100%', height: 'auto' }}
          />
          <Image
            priority
            src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-27/d44be723-90ac-4c18-8d58-5b8c25ed3cba.png'
            alt="product"
            width={310}
            height={310}
            className={styles['imgWrap']}
          />
        </section>
        <section style={{ width: '100%' }}>
          <Image
            priority
            src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-27/79ff48fd-0063-4812-8bc1-b2843dafdecd.png'
            alt="product"
            width={310}
            height={310}
            className={styles['imgWrap']}
            style={{ marginRight: '1.25rem', maxWidth: '100%', height: 'auto' }}

          />
          <Image
            priority
            src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-27/f87a8362-b747-4530-a7a4-346d31de9ae3.png'
            alt="product"
            width={702}
            height={310}
            className={styles['imgWrap']}
            style={{ marginTop: '1.25rem' }}
          />
        </section>
      </section>
    </section >
  )
}
