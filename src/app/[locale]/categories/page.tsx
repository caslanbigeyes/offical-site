'use client'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from "next/image";
import { Dialog, Toast } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl';
import { queryMobileType, OPEN_TYPE, debounce, validateForm, handleOpen } from '@/utils';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useStore from '@/store';
import { LoadingOutlined } from '@ant-design/icons';
import { queryCateGories, searchProductsInfo, addProductsInfo, getAllProducts } from '@/api';
import { Spin, message, Input, FloatButton } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { LeftOutline } from 'antd-mobile-icons';
import BottomPopup from '@/components/BottomPopup';
import ProductItem from '@/components/ProductItem';
import styles from './index.module.less'

export default function Index() {
    const t = useTranslations('global');
    const locale = useLocale();
    const [navList, setNavList] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 骨架屏
    const [productsData, setProductsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [noMoreData, setNoMoreData] = useState(false); // 没有数据case
    const [dialogVisible, setDialogVisible] = useState(false);
    const { lang } = useStore();
    const isEn = lang !== "CN"
    const appId = isEn ? '6472703992' : '6449456872';
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectSubCategory, setSubCategory] = useState('');
    const [navCode, setNavCode] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [noDataStatus, setNoDataStatus] = useState(false); // 
    const [formData, setFormData] = useState({
        name: '',
        number: 1,
        email: '',
        userName: '',
        companyName: ''
    });
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([])
    const router = useRouter();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [activeCode, setActiveCode] = useState('');


    const openPopup = useCallback(
        (i) => {
            setFormData({
                ...formData,
                name: i.commodityName,
            });
            setIsPopupOpen(true);
        },
        [],
    );



    const handleChooseFirstCategory = useCallback(
        (item) => {
            queryCateGories({ code: item.code, type: 2, isRecommend: 0 }).then(res => {
                const { data = [] } = res;
                setSubCategory(data[0].code)
                setSubCategories(data);
                setActiveCode(data[0].code)
                setCurrentPage(1)
                queryProductsInfo({ code: data[0].code, type: 3 })
            })
            setSelectedCategory(item.code)
        },
        [],
    )


    // 查询三级分类 及 数据
    const queryProductsInfo = useCallback(
        (params) => {
            queryCateGories({ code: params.code, type: params.type, isRecommend: 0 }).then(res => {
                const { data } = res;
                setNavList([...data])
                handleClick(params)
            })
        },
        [],
    )


    const handleChooseSecondCategory = async (subCategory) => {
        setSubCategory(subCategory.code)
        setActiveCode(subCategory.code)
        queryProductsInfo({ code: subCategory.code, type: 3 })
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
                    setDialogVisible(true)
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
        }
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    }

    const loadMoreProducts = useCallback(async () => {

        setNoMoreData(false)
        const newPage = currentPage + 1;
        setCurrentPage(newPage); // 更新currentPage状态  
        try {
            const { page, code } = await searchProductsInfo({
                page: newPage,
                limit: 10,
                code: activeCode,
                type: activeCode.substring(0, 1) === 'B' ? 2 : 3,
            }, 'en')

            if (code === 200) {
                setProductsData(prevProducts => [...prevProducts, ...page.list]);
                setTotalCount(page.totalCount)
                if ((Array.isArray(page.list) && !page.list.length) || totalCount === page.list.length) {
                    setNoMoreData(true)
                }
            }
        } catch (error) {
            setNoMoreData(true)
        }
    }, [currentPage, activeCode, totalCount])


    useEffect(() => {
        setIsLoading(true)
        queryCateGories({ code: null, type: 1, isRecommend: 0 }).then(res => {
            const { data = [] } = res;
            setCategories(data);
            setSelectedCategory(data[0].code)
            queryCateGories({ code: data[0].code, type: 2, isRecommend: 0 }).then(res => {
                const { data = [] } = res;
                setSubCategories(data);
                setSubCategory(data[0].code)
                setActiveCode(data[0].code)
                searchProductsInfo({
                    page: currentPage,
                    limit: 10,
                    code: data[0].code,
                    type: 2,
                }, 'en').then(res => {
                    const { page } = res;

                    setProductsData([...page.list]);
                    setCurrentPage(page.currPage);
                    setTotalCount(page.totalCount)
                })

                queryCateGories({ code: data[0].code, type: 3, isRecommend: 0 }).then(res => {
                    const { data } = res;
                    setNavList(data)
                    setIsLoading(false)
                })
            })
        })

    }, [])


    useEffect(() => {
        setTimeout(() => {
            setNoDataStatus(true);
        }, 5000);
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 100) {
                if (totalCount && productsData.length >= totalCount) return;
                loadMoreProducts()
            }
        };
        const debounceScroll = debounce(handleScroll, 200)
        window.addEventListener('scroll', debounceScroll);
        return () => window.removeEventListener('scroll', debounceScroll);
    }, [navCode, currentPage, activeCode, totalCount, productsData.length]);


    const handleClick = async (item: any) => {
        setNoDataStatus(false);
        setNavCode(item.code)
        setCurrentPage(1);
        setActiveCode(item.code)
        setNoMoreData(false)
        setTotalCount(0)
        setProductsData([])
        const { page, code } = await searchProductsInfo({
            page: 1,
            limit: 10,
            code: item.code,
            type: item.code.substring(0, 1) === 'B' ? 2 : 3,
        }, 'en')
        if (code === 200 || !page.list.length) {
            setProductsData([...page.list]);
            setTotalCount(page.totalCount)
            setNoMoreData(true)
            setNoDataStatus(true);

        }
    }



    return (
        <div className={styles['wrap']} >
            <div className={styles['con']}>
                <div className={`${isPopupOpen ? styles['isPopupOpen'] : ''}`}>
                    <div className={styles['menu-container']}>
                        <div className={styles['menu-box']}>
                            <div className={styles['menu-arrow']} onClick={() => router.back()}><LeftOutline style={{ color: '#000000' }} /></div>
                            <h1>All Categories</h1>
                        </div>
                        {!!categories.length && <div className={styles['box']}></div>}
                        <div className={styles['categories']}>
                            {

                                categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className={`${styles['category']} ${selectedCategory === category.code ? styles['active'] : ''}`}
                                        onClick={() => handleChooseFirstCategory(category)}
                                    >
                                        <Image
                                            alt={`${category.nameEn}`}
                                            loading="lazy" src={category.picUrl || "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-24/0a77d9df-daff-4f61-8a09-bf351893314b.png"} width={22} height={20} style={{ objectFit: 'cover' }} />
                                        <span className={styles['category-name']}>    {category.nameEn}</span>
                                    </div>
                                ))}
                        </div>
                        {!!subCategories.length && <div className={styles['box-second']}></div>}

                        <div className={styles['sub-categories']}>
                            {
                                subCategories.map((subCategory, index) => (
                                    <div key={index} className={styles['sub-category']} onClick={() => handleChooseSecondCategory(subCategory)}>
                                        <div className={`${styles['sub-category-box']}  ${selectSubCategory === subCategory.code ? styles['sub-active'] : ''}`}>
                                            <Image
                                                loading="lazy" style={{ objectFit: 'cover' }} src={subCategory.picUrl || "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-24/0a77d9df-daff-4f61-8a09-bf351893314b.png"} width={52} height={50} alt='category' />
                                        </div>
                                        <span className={styles['sub-category-name']}>    {subCategory.nameEn}</span>
                                    </div>
                                ))}
                        </div>
                        <div className={styles['box']}></div>
                    </div>
                </div>

                {/* 滑动nav */}
                <div className={styles['nav']}>
                    <div className={styles['navWrapper']}>
                        {
                            navList.map((i, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleClick(i)}
                                        className={`${styles['nav-item']} ${navCode === i.code ? styles['nav-active'] : ''
                                            }`}
                                    >
                                        {i.nameEn || i.name}
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>

            <div className={styles.products}>
                {

                    (productsData.map((i, index) => {
                        return (
                            <div style={{ display: 'flex' }} key={index}>
                                <ProductItem myKey={index} i={i} openPopup={openPopup} />
                            </div>

                        )
                    }))
                }

                {productsData.length % 2 !== 0 && (
                    <div className={styles['imgProWrap']} style={{ visibility: 'hidden', marginRight: 0 }}>
                        <div className={styles.imgWrap}>
                            <Skeleton height={182} width={180} />
                        </div>
                    </div>
                )}


                {!!!productsData.length && (
                    <div className={styles['noDataWrap']} style={{ paddingTop: '22vw' }}>
                        {
                            noDataStatus ? (
                                <>
                                    <Image src='/nodata.png' width={126} height={80} alt='category'
                                        loading="lazy" />
                                    <div className={styles['noDataIcon']}>暂无数据</div>
                                </>) :
                                (<Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#3AB86D' }} spin />}></Spin>)
                        }
                    </div>
                )}

                {!noMoreData && <div className={styles['loadMore']}> <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#3AB86D' }} spin />} /></div>}


                {totalCount === 0 || totalCount <= productsData.length ? <div className={styles['noData']}>no more data...</div> : null}

                <FloatButton.Group shape="circle">
                    <FloatButton.BackTop visibilityHeight={1200} />
                </FloatButton.Group>
            </div>

            <BottomPopup errors={errors} isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} sendInquiry={sendInquiry} formData={formData} handleChange={handleChange} />
            <Dialog
                visible={dialogVisible}
                closeOnMaskClick
                title="Sent Successfully"
                content="Log in to Bincial App with your email, help yourself to the reply and more business opportunities!"
                bodyStyle={{
                    textAlign: 'center', fontSize: '17px'
                }}
                closeOnAction
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
        </div >
    )
}

