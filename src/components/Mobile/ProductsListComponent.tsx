import React, { memo } from 'react'
import Image from "next/image";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './index.module.less'
import { Spin, FloatButton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { handleRouterDetail } from '@/utils'
import Link from "next/link";

function ProductsListComponent({ openPopup, noMoreData, noDataStatus, productsData, downLoadVisible, handleOpen, queryMobileType, isEn, isLoading, totalCount }) {
    return (
        <section className={styles.products} style={{ background: '#fafafa' }}>
            {
                productsData.map((i, index) => (
                    <section className={styles['imgProWrap']} style={{ marginRight: index % 2 === 0 ? '5px' : 0 }} key={index}>
                        <section className={styles.imgWrap} onClick={() => handleRouterDetail(i.id)}>
                            <Image
                                src={i.coverUrl || "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-24/0a77d9df-daff-4f61-8a09-bf351893314b.png"}
                                alt={`${i.commodityName}`}
                                width={160}
                                height={180}
                                loading="lazy"
                                style={{
                                    width: '35.4667vw',
                                    height: '35.4667vw'
                                }}
                                placeholder='blur'
                                blurDataURL={i.coverUrl || "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-24/0a77d9df-daff-4f61-8a09-bf351893314b.png"}
                            />
                        </section>
                        <section className={styles.textWrap} >
                            <section className={styles.des}>
                                {i.commodityName}
                            </section>
                            <section className={styles.contact} onClick={() => openPopup(i)}>
                                Contact Supplier
                            </section>
                        </section>
                    </section>

                ))
            }

            {
                productsData.length % 2 !== 0 && (
                    <section className={styles['imgProWrap']} style={{ visibility: 'hidden', marginRight: 0 }}>
                        <section className={styles.imgWrap}>
                            <Skeleton height={268} width={170} />
                        </section>
                    </section>
                )
            }


            {!!!productsData.length && (
                <section className={styles['noDataWrap']} style={{ paddingTop: !downLoadVisible ? '44.5333vw' : '22vw' }}>
                    {
                        noDataStatus ? (
                            <>
                                <Image src='/nodata.png' width={126} height={80} alt="bincial" />
                                <section className={styles['noDataIcon']}>暂无数据</section>
                            </>) :
                            (<Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#3AB86D' }} spin />}></Spin>)
                    }
                </section>
            )}

            {isLoading && <section style={{ width: '100%', textAlign: 'center' }}> <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#3AB86D' }} spin />} /></section>}


            {(noMoreData && totalCount === productsData.length) ? <section className={styles['noData']}>no more data...</section> : null}
            <FloatButton.Group shape="circle">
                <FloatButton.BackTop visibilityHeight={1200} />
            </FloatButton.Group>
        </section>
    )
}


export default memo(ProductsListComponent)