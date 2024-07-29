import React from 'react';
import Image from "next/image";
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { handleRouterDetail } from '@/utils'
import styles from './index.module.less'; // 引入LESS样式文件  

const MotorCard = ({ motor }) => {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === 'en'
  // 模拟数据  
  const mockMotor = {
    model: 'SC516C',
    title: 'Electric Motor SC516C',
    spec: 'Load Capacity: 2 Tons',
    price: 'US$340.00',
    src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/images/2024-05-24/1716530645245_1525_290.png',
  };

  // 如果传入motor，则使用传入的，否则使用mock数据  
  const motorToUse = motor || mockMotor;

  const handleRouterPush = (i) => {
    handleRouterDetail(i.id, router, isEn)
  }

  return (
    <>

      <div className={styles.motorCard} onClick={() => handleRouterPush(motor)}>
        <Image src={motorToUse.coverUrl}
          priority
          // layout="responsive"
          key={motorToUse.coverUrl}
          alt="bincial"
          width={153}
          height={153}
        />
        <div className={styles.title}>{motorToUse.commodityName}</div>
        <div className={styles.spec}>{(motorToUse.minPrice !== 0 && motorToUse.minPrice !== null) ? `${motorToUse.currencyStr}${motorToUse.minPrice}-${motorToUse.maxPrice}` : 'Negotiation'}

          {motorToUse.minPrice !== 0 && motorToUse.priceUnit ? <div className={styles.price}> /{motorToUse.priceUnit || ''}</div> : ''}
        </div>

      </div>
    </>
  );
};

export default MotorCard;