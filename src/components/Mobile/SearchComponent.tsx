// SearchComponent.jsx
import React, { memo } from 'react';
import { Input, Spin } from 'antd';
import Image from "next/image";
import { LoadingOutlined } from '@ant-design/icons';
import Link from "next/link";
import styles from './index.module.less';

const SearchComponent = ({ inputValue, handleChangeSearch, onSearch, placeholder, setDownLoadVisible, downLoadVisible, handleCompositionStart, handleCompositionEnd }) => {

    const handleSearch = () => onSearch(inputValue);

    const Suffix = (
        <Image
            alt='arrow'
            width={14}
            height={14}
            src="https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/c0cc64ae-aa87-426e-92e8-ea4a5b44844d.png"
        />
    );

    return (
        <section className={`${styles['search-wrapper']} ${!downLoadVisible ? styles['search-wrapper-downLoad'] : ''} `} >
            <section className={styles.search}>
                <Input
                    allowClear
                    prefix={Suffix}
                    placeholder={placeholder}
                    value={inputValue}
                    onFocus={() => setDownLoadVisible(false)}
                    onChange={handleChangeSearch}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    onKeyPress={(ev) => ev.key === 'Enter' && handleSearch()}
                />
            </section>
            <Link className={styles['all-category']} href='/categories' prefetch={true}>
                <Image

                    loading="lazy"
                    alt="bincial"
                    width={9}
                    height={9}
                    src="https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/59ded4fe-f185-49fd-a236-3cc10e82a324.png" />
                <span className={styles['all-category-text']}>All Categories</span>
            </Link>

        </section>
    );
};

export default memo(SearchComponent);