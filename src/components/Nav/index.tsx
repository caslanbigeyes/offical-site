'use client';
import React, { useEffect, useState, useRef, Suspense, useCallback } from 'react'
import { Carousel, message } from 'antd';
import Script from 'next/script';
import { useTranslations, useLocale } from 'next-intl';
import Layout from '@/components/Layout';
import Image from "next/image";
import { Spin, Input, Pagination } from 'antd';
import styles from './index.module.less'
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { queryImages, getSearchInfo, searchProductsInfo, addProductsInfo, getRecommendKeyWord, recommendProductsInfo, getCertificateInfo, getCityInfo } from '@/api';
import useStore from '@/store/index';
import InquiryModal from '@/components/InquiryModal';
import InquirySuccess from '@/components/InquirySuccess';
import { debounce } from 'throttle-debounce';
import { handleRouterDetail } from '@/utils'
import withSuspense from '@/hoc';
import SearchFilters from '@/components/SearchFilters'
import PcProductIem from '@/components/PcProductIem';
import SearchNoResult from '@/components/SearchNoResult';

// import ProductSkeleton from '@/components/Skeletons/productSkeletons'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import SearchWrap from '@/components/SearchWrap';


const Footer = withSuspense(dynamic(() => import('@/components/Footer'), { ssr: true }));
const Contact = withSuspense(dynamic(() => import('@/components/Contact'), { ssr: true }));

export default function Index({ params, projects, cityInfo, certificateInfo, searchInfo, recommendKeyWord }) {

    const router = useRouter();
    const { ThirdCategory, FirstCategory, SecondCategory,
        setThirdCategory, count, setFirstCategory,
        activeCode, setSecondCategory, recommendProducts,
        setSelectedFirst, setSelectedSecond, setSelectedThird, searchPlaceHolder } = useStore();
    const setActiveCategory = useStore((state) => state.setActiveCategory);

    const setSearchPlaceHolder = useStore((state) => state.setSearchPlaceHolder);
    const setRecommendProducts = useStore((state) => state.setRecommendProducts);
    const t = useTranslations('global');
    const pathname = useSearchParams()
    const locale = useLocale();
    const isEn = locale === 'en'
    const [pageUrls, setPageUrls] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isComposing, setIsComposing] = useState(false);
    // const [searchPlaceHolder, setSearchPlaceHolder] = useState('')
    const [productsData, setProductsData] = useState([]);
    const [totalCount, setTotalCount] = useState(null);
    const [InquiryVisible, setInquiryVisible] = useState(false);

    // const [recommendProducts, setRecommendProducts] = useState([]);
    const [isRecommend, setIsRecommend] = useState(true);  // 先关闭分类
    const [noSearchResult, setNoSearchResult] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [inpValue, setInpValue] = useState(pathname.get('keyword') || '')
    const [searchParams, setSearchParams] = useState({
        value: inpValue,
        page: 1,
        minPrice: undefined,
        maxPrice: undefined,
        deliveryNum: undefined,
        cityCodes: []
    });

    const [certs, setCerts] = useState([]);
    const [productTitle, setProductTitle] = useState('');


    useEffect(() => {
        console.log(activeCode, 'activeCode')
    }, [activeCode])


    useEffect(() => {
        if (searchInfo) {
            setSearchPlaceHolder(searchInfo)
        }
        if (Array.isArray(recommendKeyWord) && recommendKeyWord.length) {
            setRecommendProducts([...recommendKeyWord])
        }
        if (inpValue || Object.values(activeCode).length) {
            handleSearch({ keyWord: inpValue, page: 1 })
        }
        if (projects?.page?.list?.length > 0) {
            setProductsData([...projects?.page?.list])
            setTotalCount(projects?.page?.totalCount)
        }
    }, [])



    const handleRecommend = (i) => {
        let val = isEn ? i.nameEn : i.name;
        setInpValue(val)
        handleSearch({ page: 1, value: val, })
    }

    const queryApiData = async (page) => {
        try {
            const { page: { list = [], totalCount = 0 }, code } = await recommendProductsInfo({
                page,
                limit: 8,
            }, locale)
            if (code === 200) {
                setProductsData([...list]);
                setTotalCount(totalCount);
                setSearchLoading(false)
            }
        } catch (error) {
            setSearchLoading(false)
            setNoSearchResult(true)
        }
    }




    const handleChange = (e) => {
        const { value } = e.target;
        setInpValue(value)
        if (!isComposing) {
            handleSearch({ value: e.target.value, page: 1 })
        }
    }

    const handleChangeSearch = () => {
        if (!isComposing) {
            debouncedHandleSearch({ value: inpValue, page: 1 });
        }
    }





    const handleSearch = useCallback(
        async (newParams = {}) => {
            setSearchLoading(true)

            if (window.gtagNeo) {
                window.gtagNeo('event', 'conversion', {
                    'send_to': 'AW-16589036935/DOMRCLzBv78ZEIe7ouY9',
                });
            }
            setIsRecommend(false);
            setNoSearchResult(false);
            let num;
            const firstChar = activeCode.activeCode && activeCode.activeCode.substring(0, 1);
            if (firstChar === 'A') {
                num = 1;
            } else if (firstChar === 'B') {
                num = 2;
            } else if (firstChar === 'C') {
                num = 3;
            } else {
                num = undefined; // 默认值，可以根据需要调整
            }


            // 合并新的搜索参数和旧的搜索参数  
            const combinedParams = {
                ...searchParams,
                code: activeCode.activeCode,
                type: activeCode.activeCode && num,
                ...newParams,
            };
            console.log(combinedParams, activeCode, 11)

            // 更新搜索参数状态  
            setSearchParams(combinedParams);


            if (!isComposing) {
                try {
                    const { page: { list = [], totalCount = 0 }, code } = await searchProductsInfo({
                        keyWord: combinedParams.value,
                        page: combinedParams.page,
                        limit: 8,
                        code: combinedParams.code,
                        type: combinedParams.type,
                        minPrice: combinedParams.minPrice || 0,
                        maxPrice: combinedParams.maxPrice || 10000000,
                        deliveryNum: combinedParams.deliveryNum,
                        cityCodes: [...new Set([...combinedParams.cityCodes])]
                    }, locale)
                    if (code === 200 && Array.isArray(list) && list?.length > 0) {
                        setSearchLoading(false)
                        setProductsData([...list]);
                        setTotalCount(totalCount);
                        if (list.length === 0) {
                            setNoSearchResult(true)
                            setSearchLoading(false)
                        }
                    } else {
                        setProductsData([]);
                        setSearchLoading(false)
                        setNoSearchResult(true)
                    }
                } catch (error) {
                    setSearchLoading(false)
                    setNoSearchResult(true)
                }
            }
        },
        [activeCode.activeCode, searchParams, isComposing, locale],
    )

    const debouncedHandleSearch = useCallback(debounce(500, handleSearch), [handleSearch]);

    const handleChangePage = useCallback(
        (item) => {
            if (isRecommend) {
                queryApiData(item)
            } else {
                debouncedHandleSearch({ ...searchParams, value: inpValue, page: item });

            }
            setSearchParams({
                ...searchParams,
                page: item
            })
        },
        [isRecommend, searchParams],
    )

    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = (e) => {
        setIsComposing(false);
        setInpValue(e.target.value);
        debouncedHandleSearch({ value: e.target.value, page: 1 });
    };

    const handleConcat = useCallback(
        (i = {}) => {
            if (window.gtag) {
                window.gtag('event', 'conversion', { 'send_to': 'AW-16542173570/br4GCKTuh78ZEIKT9s89' });
                window.gtagNeo('event', 'conversion', { 'send_to': 'AW-16589036935/P1lICJzwrL8ZEIe7ouY9' });
            }
            setInquiryVisible(true)
            setProductTitle(i.commodityName)
        },
        [],
    )

    const handleClose = useCallback(
        (type) => {
            if (type === 'first') {
                setActiveCategory({
                    activeCode: null,
                    activeName: null,
                })
                setSelectedFirst(FirstCategory.FirstCode)

            } else if (type === 'second') {
                setSelectedSecond(SecondCategory.secondCode)
                setActiveCategory({
                    activeName: FirstCategory.FirstName,
                    activeCode: FirstCategory.FirstCode,
                })
                setSecondCategory({
                    secondName: ''
                })
                setThirdCategory({
                    thirdName: ''
                })
            } else {
                setSelectedThird(ThirdCategory.thirdCode)
                setActiveCategory({
                    activeName: SecondCategory.secondName,
                    activeCode: SecondCategory.secondCode,
                })
                setThirdCategory({
                    thirdName: ''
                })

            }
            handleSearch({ page: 1, activeCode: { activeCode: null }, type: null })
        },
        [activeCode.activeCode],
    )


    const handlePushNewPage = (i, type) => {
        let id = type === 'enterPrise' ? i.userInfo.id : i.id
        handleRouterDetail(id, router, isEn, type)
        if (window.gtagNeo) {
            window.gtagNeo('event', 'conversion', {
                'send_to': 'AW-16589036935/JbQ7CLr-y78ZEIe7ouY9',
            });
        }
    }

    const productProps = {
        productsData,
        handlePushNewPage,
        handleConcat,
        searchLoading,
        totalCount,
    }


    if ((!!!productsData.length || totalCount === 0)) {
        return (
            <>
                <SearchWrap setInpValue={setInpValue} inpValue={inpValue} searchInfo={searchInfo} recommendKeyWord={recommendKeyWord} handleSearch={handleSearch} isShop />
                <div className={styles['noDataWrap']} >
                    {noSearchResult && (
                        <>
                            {/* <Image priority src='/noDataPic.png' width={126} height={80} alt='product' />
                                <div className={styles['noData']}>暂无数据</div> */}
                            <SearchNoResult inpValue={inpValue} />
                        </>)
                    }
                </div>
                <Footer />
            </>

        )
    }

    return (
        <>
            <SearchWrap setInpValue={setInpValue} inpValue={inpValue} searchInfo={searchInfo} recommendKeyWord={recommendKeyWord} handleSearch={handleSearch} isShop />

            <div>
                {activeCode.activeCode ?
                    (<div className={styles.navCategory}>
                        {FirstCategory.FirstName &&
                            <span className={styles['activeCode']}> {FirstCategory.FirstName}
                                <span className={styles['xClose']} onClick={() => handleClose('first')}>x</span>
                            </span>}
                        {SecondCategory.secondName && <span className={styles['arrow']}>{'>'}</span>}


                        {SecondCategory.secondName &&
                            <span className={styles['activeCode']}>
                                {SecondCategory.secondName}<span className={styles['xClose']} onClick={() => handleClose('second')}>x</span>
                            </span>}
                        {ThirdCategory.thirdName && <span className={styles['activeArrow']}>{'>'}</span>}


                        {ThirdCategory.thirdName &&
                            <span className={styles['activeCode']}>
                                {ThirdCategory.thirdName}<span className={styles['xClose']} onClick={() => handleClose('third')}>x</span>
                            </span>}
                    </div>) : null}


                <div className={styles.contentWrap}>

                    <SearchFilters handleSearch={handleSearch} extList={cityInfo?.data || []} />

                    <div className={styles.content}>
                        <h3>{activeCode.activeName}</h3>
                        <div className={styles.products}>
                            <PcProductIem {...productProps} />

                            {/* {searchLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#3AB86D' }} spin />}></Spin>} */}

                        </div>
                        {!!productsData.length && <div className={styles.pageWrap}>  <Pagination current={searchParams.page} showSizeChanger={false} onChange={(item) => handleChangePage(item)} defaultCurrent={1} total={totalCount} /></div>}
                        {/* <ProductSkeleton />  */}
                    </div>
                </div>


            </div>

            <Contact shopDetail />
            <Footer />
            <InquiryModal productTitle={productTitle} visible={InquiryVisible} setVisible={setInquiryVisible} />
        </>
    )
}
