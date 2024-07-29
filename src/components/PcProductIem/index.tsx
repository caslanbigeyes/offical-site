import React from 'react'
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";
import { message } from 'antd';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";
import styles from './index.module.less'


export default function Index({ totalCount, productsData, handlePushNewPage, handleConcat, searchLoading }) {

    const t = useTranslations('global');

    // Calculate the number of placeholders needed
    const placeholdersCount = (4 - (productsData.length % 4)) % 4;
    const placeholders = Array.from({ length: placeholdersCount }).map((_, index) => (
        <div className={`${styles.imgProWrap} ${styles.hiddenPlaceholder}`} key={`placeholder-${index}`}>
            <div className={styles.imgWrap}>
                <Skeleton height={195} width={195} />
            </div>
        </div>
    ));


    return (
        <>
            {

                // 显示骨架屏
                searchLoading ? Array.from({ length: 8 }).map((_, index) => (
                    <div className={styles.imgProWrap} key={`${index}-Math.random()`}>
                        <div className={styles.imgWrap}>
                            <Skeleton key={index} height={195} width={195} />
                        </div>
                    </div>
                ))
                    : [...productsData].map((i, index) => (
                        <div className={styles.imgProWrap} key={`${index}-Math.random()`}>
                            <Link href={`/shop/${i.id}`} prefetch={true}>
                                <div className={styles.imgWrap} >
                                    <Image
                                        loading='lazy'
                                        src={i.coverUrl || '/3x.png'}
                                        alt={`${i.commodityName}`}
                                        width={195}
                                        height={195}
                                        style={{ borderRadius: '8px 8px 0 0' }}
                                    />
                                </div>
                            </Link>
                            <div className={styles.textWrap}>
                                <Link href={`/shop/${i.id}`} prefetch={true}>
                                    <div className={styles.des}>
                                        {i.commodityName}
                                    </div>
                                    <div className={styles.price}>
                                        <span className={styles.num}>
                                            {!i.minPrice ? 'Negotiation' : (
                                                i.minPrice !== null && i.maxPrice !== null ? `${i.currencyStr}${i.minPrice} - ${i.maxPrice}` : 'Price Unavailable'
                                            )}
                                        </span>
                                        <span className={styles.uom}>{i.uom}</span>

                                    </div>
                                </Link>
                                <Link href={`/enterPrise/${i.userInfo.id}`} prefetch={true}>
                                    <div className={styles.companyName}>
                                        <img src={i.userInfo.nationalFlagUrl} width={16} height={16} style={{ marginRight: '4px' }} /> {i?.userInfo?.nickName || 'Shenzhen Sensor And Control Company Limited'}
                                    </div>
                                </Link>
                                <div className={styles.address}>
                                    <div className={styles.concat} onClick={() => handleConcat(i)}>
                                        {t('shopContact')}
                                    </div>
                                </div>
                            </div>
                        </div >
                    ))
            }
            {
                placeholders.map((i, index) => (
                    <div className={`${styles.imgProWrap} ${styles.hiddenPlaceholder}`} key={`${index}-Math.random()`}>
                        <div className={styles.imgWrap}>
                            <Image
                                loading='lazy'
                                src={i.coverUrl || '/3x.png'}
                                alt={`${i.commodityName}`}
                                width={195}
                                height={195}
                                style={{ borderRadius: '8px 8px 0 0' }}
                            />
                        </div>
                    </div>
                ))
            }
        </>
    )
}
