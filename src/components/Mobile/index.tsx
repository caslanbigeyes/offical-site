'use client'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { queryMobileType, OPEN_TYPE, validateForm, handleOpen } from '@/utils';
import { Dialog, Toast } from 'antd-mobile'
import { queryNabs, searchProductsInfo, addProductsInfo, getSearchInfo, recommendProductsInfo } from '@/api';
import useStore from '@/store';
import { debounce } from 'throttle-debounce';
import SearchComponent from './SearchComponent'
import TopBanner from './TopBanner';
import ProductsListComponent from './ProductsListComponent'
import withSuspense from '@/hoc';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import styles from './index.module.less'

const NavigationComponent = withSuspense(dynamic(() => import('./NavigationComponent'), { ssr: true }));
// const ProductsListComponent = dynamic(() => import('./ProductsListComponent'), { ssr: false });
const BottomPopup = withSuspense(dynamic(() => import('@/components/BottomPopup'), { ssr: true }));




export default function Index() {
    const t = useTranslations('global');
    const locale = useLocale();
    const [formData, setFormData] = useState({
        name: '',
        number: 1,
        email: '',
        userName: '',
        companyName: ''
    });
    const [downLoadVisible, setDownLoadVisible] = useState(true);
    const [navList, setNavList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [navCode, setNavCode] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [noMoreData, setNoMoreData] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const setLang = useStore((state) => state.lang);
    const { lang } = useStore();
    const [inputValue, setInputValue] = useState('');
    const isEn = lang !== "CN"
    const appId = isEn ? '6472703992' : '6449456872';
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [isComposing, setIsComposing] = useState(false);
    const [searchPlaceHolder, setSearchPlaceHolder] = useState('')
    const [errors, setErrors] = useState({});
    const [noDataStatus, setNoDataStatus] = useState(false);

    const openPopup = (i) => {
        setFormData({
            ...formData,
            name: i.commodityName,
        });
        setIsPopupOpen(true);
    };


    const handleSearch = useCallback(
        async (value) => {
            if (!isComposing) {
                setIsLoading(true)
                const { page: { list = [], totalCount = 0 }, code } = await searchProductsInfo({
                    keyWord: value,
                    page: 1,
                    limit: 10,
                    code: navCode,
                    type: navCode && 2,
                }, 'en')
                if (code === 200) {
                    if (totalCount === 0 && !list.length) {
                        setNoDataStatus(true)
                        setProductsData([])
                    }
                    else if (Array.isArray(list) && !list.length || totalCount === list.length) {
                        setNoMoreData(true)
                        setProductsData([...list]);
                        setIsLoading(false)
                        return;
                    } else {
                        setProductsData([...list]);
                        setIsLoading(false)
                        setTotalCount(totalCount);
                        setNoMoreData(false)
                    }
                } else {
                    setNoDataStatus(true)
                }
            }
        },
        [navCode],
    )

    const debouncedHandleSearch = useCallback(debounce(500, handleSearch), [handleSearch]);


    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    const handleCompositionEnd = (e) => {
        setIsComposing(false);
        setInputValue(e.target.value);
        debouncedHandleSearch(e.target.value);
    };

    const handleChangeSearch = (e) => {
        setInputValue(e.target.value);
        if (!isComposing) {
            debouncedHandleSearch(e.target.value);
        }
    }

    const sendInquiry = (event) => {
        event.preventDefault();
        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            if (!formData.number) { formData.number = 0 }
            addProductsInfo({ ...formData }).then(res => {
                if (res.code === 200) {
                    setFormData({
                        name: '',
                        number: 1,
                        email: '',
                        userName: '',
                        companyName: '',
                        fullName: '',
                    })
                    setIsPopupOpen(false);
                    setDialogVisible(true);
                } else {
                    Toast.show({
                        content: res.msg,
                        position: 'top',
                    })
                }
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'number') {
            // 过滤掉非数字字符
            const filteredValue = value.replace(/[^0-9]/g, '');
            // 只允许输入整数且不超过10位
            if (/^\d{0,10}$/.test(filteredValue)) {
                setFormData({
                    ...formData,
                    [name]: filteredValue,
                });
            } else {
                // 清空输入框
                setFormData({
                    ...formData,
                    [name]: '',
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    }

    const handleClick = useCallback(
        async (item: any, index: number) => {
            setActiveIndex(index)
            setNavCode(item.code)
            setIsLoading(true)
            setCurrentPage(1);
            const { page: { list, totalCount }, code } = await searchProductsInfo({
                page: 1,
                limit: 10,
                code: item.code,
                type: 2,
                keyWord: inputValue,
            }, 'en')
            if (code === 200) {
                setProductsData([...list]);
                setTotalCount(totalCount);

                if (Array.isArray(list) && !list.length || totalCount === list.length) {
                    setNoMoreData(true)
                    setNoDataStatus(true)
                    setIsLoading(false)
                }
            }
        },
        [],
    )

    const loadMoreProducts = useCallback(async () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage); // 更新currentPage状态  
        setIsLoading(true)
        try {
            const { page: { list = [], totalCount = 0 }, code } = !downLoadVisible ? await searchProductsInfo({
                page: newPage,
                limit: 10,
                keyWord: inputValue,
                code: navCode,
                type: navCode && 2,
            }, 'en') : await recommendProductsInfo({
                page: newPage,
                limit: 10,
            }, 'en')
            if (code === 200) {
                setTotalCount(totalCount);
                setProductsData(prevProducts => [...prevProducts, ...list]);
                if (Array.isArray(list) && !list.length || totalCount === list.length) {
                    setNoMoreData(true)
                    setIsLoading(false)
                }
            }

        } catch (error) {
            setNoMoreData(false)
            setIsLoading(false)
        }
    }, [currentPage, navCode, inputValue, downLoadVisible])


    useEffect(() => {
        setIsLoading(true)
        queryApiData();
    }, [])


    useEffect(() => {
        fetch('https://ipinfo.io?token=3a805a77dfc9c7')
            .then(response => response.json())
            .then(data => {
                const country = data.country;
                if (country === 'CN') {
                    setLang('CN')
                }
            })
            .catch(error => {
                // Toast.show({ content: '请手动去App store中下载缤商' });
            });
        getSearchInfo('en').then(res => {
            if (res.code === 200) {
                setSearchPlaceHolder(res.data);
            }
        })
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 100) {
                loadMoreProducts()
            }
        };
        const debounceScroll = debounce(200, handleScroll)
        window.addEventListener('scroll', debounceScroll);
        return () => window.removeEventListener('scroll', debounceScroll);
    }, [navCode, currentPage]);

    const queryApiData = async () => {
        const { data } = await queryNabs()
        setNavList(data)
        if (Array.isArray(data) && data.length > 0) {
            const { page } = await recommendProductsInfo({
                page: currentPage,
                limit: 10,
            }, 'en')
            setIsLoading(false)
            setProductsData([...page.list]);
            setCurrentPage(page.currPage);
        }
    }


    const handleChangeBlur = useCallback(
        () => {
            setDownLoadVisible(true)
            setInputValue('')
            setCurrentPage(1)
            queryApiData()
        },
        [],
    )

    const searchProps = {
        handleCompositionStart,
        handleCompositionEnd,
        setDownLoadVisible,
        handleChangeSearch,
        onSearch: debouncedHandleSearch,
        placeholder: searchPlaceHolder,
        downLoadVisible,
        inputValue,
    }

    const navProps = {
        navList,
        activeIndex,
        handleClick, isLoading
    }

    const productsProps = {
        productsData,
        downLoadVisible,
        isEn,
        isLoading,
        totalCount,
        noDataStatus,
        noMoreData,
        handleOpen,
        queryMobileType,
        openPopup,
    }

    const topProps = {
        downLoadVisible,
        isPopupOpen,
        handleOpen,
        queryMobileType,
        setDownLoadVisible,
        handleChangeBlur,
        isEn
    }


    return (
        <section className={`${styles['wrap']}`} >
            <section className={styles['wrap-content']}>
                <TopBanner {...topProps} />
                <SearchComponent {...searchProps} />
                <NavigationComponent {...navProps} />
            </section>

            <ProductsListComponent {...productsProps} />

            <BottomPopup errors={errors} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} sendInquiry={sendInquiry} formData={formData} handleChange={handleChange} />

            <Dialog
                visible={dialogVisible}
                closeOnMaskClick
                closeOnAction={true}
                title="Sent Successfully"
                content="Log in to Bincial App with your email, help yourself to the reply and more business opportunities!"
                bodyStyle={{
                    textAlign: 'center', fontSize: '17px'
                }}
                onClose={() => {
                    setDialogVisible(false);
                }}
                actions={[
                    {
                        key: 'confirm',
                        text: 'Go To Bincial',
                        style: { color: '#14B656' },
                        onClick: () => {
                            handleOpen(queryMobileType(), isEn);
                            setDialogVisible(false);
                        },
                    },
                ]}
            />
        </section >
    )
}

