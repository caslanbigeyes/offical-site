
import React from 'react';
import styles from '../../app/[locale]/categories/index.module.less';
import Image from "next/image";
import { handleRouterDetail } from '@/utils';

const ProductItem = ({ myKey, i, openPopup }) => {
    return (
        <div className={styles['imgProWrap']} style={{ marginRight: myKey % 2 === 0 ? '5px' : 0 }} key={myKey}>
            <div className={styles.imgWrap} onClick={() => handleRouterDetail(i.id)}>
                <Image
                    loading="lazy"
                    src={i.coverUrl || "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-24/0a77d9df-daff-4f61-8a09-bf351893314b.png"}
                    alt="product"
                    width={133}
                    height={133}
                    style={{
                        width: '35.4667vw',
                        height: '35.4667vw',
                        objectFit: 'cover'
                    }}
                    placeholder='blur'
                    blurDataURL={i.coverUrl || "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-24/0a77d9df-daff-4f61-8a09-bf351893314b.png"}
                />
            </div>
            <div className={styles.textWrap}>

                <div className={styles.des}>
                    {i.commodityName}
                </div>
                <div className={styles.contact} onClick={() => openPopup(i)}>

                    Contact Supplier
                </div>
            </div>
        </div>
    )
}


export default ProductItem;