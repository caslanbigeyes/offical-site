'use client'
import React, { useState } from 'react'
import Image from "next/image";
import { handleRecommendAndSearch } from '@/utils';
import useStore from '@/store/index';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Input } from 'antd';
import styles from './index.module.less'

export default function Index({ inpValue, setInpValue, handleSearch, isShop }) {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === 'en'
  const { recommendProducts,
    searchPlaceHolder } = useStore();
  const handleFunc = () => {
    return isShop ? handleSearch({ value: inpValue }) : handleRecommendAndSearch(inpValue, isEn, router);
  }
  return (
    <div className={styles.searchWrap}>
      <div className={styles.input} >
        <Input
          allowClear
          onPressEnter={() => handleFunc()}
          placeholder={searchPlaceHolder}
          value={inpValue}
          onChange={(e) => { setInpValue(e.target.value) }}
          suffix={<Image loading='lazy' onClick={() => handleFunc()} src='/searchIcon.png' width={20} height={20} alt='search' />
          }
        />
      </div>
      <div className={styles.btn}>
        {Array.isArray(recommendProducts) && !!recommendProducts.length && recommendProducts.map((i, index) => {
          return isShop ?
            (<span key={`${index}-Math.random()`} onClick={() => {
              handleSearch({
                value: isEn ? i.nameEn : i.name,
                page: 1
              })
              let val = isEn ? i.nameEn : i.name
              setInpValue(val)
            }} className={styles['recommend']}>{isEn ? i.nameEn : i.name}</span>)
            : (<Link prefetch={false} key={`${index}-Math.random()`} href={`/shop?keyword=${isEn ? i.nameEn : i.name}`} className={styles['recommend']}>{isEn ? i.nameEn : i.name}</Link>)
        }
        )}
      </div>
    </div >
  )
}
