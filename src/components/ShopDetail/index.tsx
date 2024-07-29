'use client'
import React, { useEffect, useState, useRef, Suspense, useCallback } from 'react'
import { Carousel, message } from 'antd';
import Script from 'next/script';
import { useTranslations, useLocale } from 'next-intl';
import Layout from '@/components/Layout';
import Image from "next/image";
import { Spin, Input, Pagination } from 'antd';
import styles from './index.module.less'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { queryImages, getSearchInfo, searchProductsInfo, addProductsInfo, getRecommendKeyWord, recommendProductsInfo, getProductDetail } from '@/api';
import useStore from '@/store/index';
import InquiryModal from '@/components/InquiryModal';
import { debounce } from 'throttle-debounce';
import { handleRouterDetail } from '@/utils'
import withSuspense from '@/hoc';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import ImageGallery from "@/components/ImageGallery";
import ProductPage from '@/components/ProductPage';
import SearchWrap from '@/components/SearchWrap';


const Footer = withSuspense(dynamic(() => import('@/components/Footer'), { ssr: true }));
const Contact = withSuspense(dynamic(() => import('@/components/Contact'), { ssr: true }));
const ProductDescription = withSuspense(dynamic(() => import('@/components/ProductDescription'), { ssr: true }));
const ProductList = withSuspense(dynamic(() => import('@/components/ProductList'), { ssr: true }));



export default function Index({ params, productInfo }) {
    const router = useRouter();

    const t = useTranslations('global');
    const pathname = useSearchParams()
    const locale = useLocale();
    const isEn = locale === 'en'
    const [InquiryVisible, setInquiryVisible] = useState(false);

    const [productTitle, setProductTitle] = useState('');
    const [inpValue, setInpValue] = useState(pathname.get('keyword') || '')


    const handleConcat = useCallback(
        (i) => {
            setProductTitle(i.commodityName)
            if (window.gtag) {
                window.gtag('event', 'conversion', { 'send_to': 'AW-16542173570/br4GCKTuh78ZEIKT9s89' });
                window.gtagNeo('event', 'conversion', { 'send_to': 'AW-16589036935/P1lICJzwrL8ZEIe7ouY9' });
            }
            setInquiryVisible(true)
        },
        [],
    )



    const searchProps = {
        inpValue,
        setInpValue,
    }

    return (
        <>
            <Layout curActive='/shop'>
                <div className={styles.wrap} >
                    <SearchWrap {...searchProps} />

                    <div className={styles.products}>

                        <div className={styles['topPart']}>
                            <ImageGallery productInfo={productInfo} id={params.id} />
                            {/* <ImageGallery items={images} />; */}
                            {/* {isFixed && <div className={styles.fixedRight}></div>} */}
                            {/* <div ref={productPageRef} style={{ position: isFixed ? 'fixed' : 'static', top: isFixed ? '64px' : 'auto', zIndex: isFixed ? 1000 : undefined, background: isFixed ? '#ffffff' : 'unset', right: isFixed ? '14%' : 'unset', width: isFixed ? '530px' : 'unset' }}> */}
                            <ProductPage productInfo={productInfo} handleConcat={handleConcat} />
                            {/* </div> */}
                        </div>


                    </div>
                </div>

                <Footer />
                <InquiryModal productTitle={productTitle} visible={InquiryVisible} setVisible={setInquiryVisible} />
            </Layout>
        </>

    )
}
