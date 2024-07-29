
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import { handleRouterDetail } from '@/utils';
import QRcodeModal from '@/components/QRcodeModal';
import styles from './index.module.less';


const ProductPage = ({ productInfo = {}, handleConcat = () => { } }) => {
  const t = useTranslations('global');
  const router = useRouter();

  const locale = useLocale();
  const isEn = locale === 'en'
  const [codeVisible, setCodeVisible] = useState(false)



  const product = {
    title: isEn ? productInfo.nameEn : productInfo.name,
    price: !`${productInfo.minPrice}` ? `${productInfo.currencyStr}${productInfo.minPrice} - ${productInfo.maxPrice} |` : 'Negotiation',
    minOrder: '1,000 Pieces (Min. Order)',
    details: {
      model: 'A563',
      surfaceTreatment: 'Zinc Plated',
      origin: `${productInfo.userInfo?.cityName || '-'}`,
      material: 'Bearing Steel',
    },
    customization: 'Available',
    samples: !`${productInfo.minPrice}` ? `${productInfo.currencyStr}${productInfo.minPrice} - ${productInfo.maxPrice} |` : 'Negotiation',
    support: '24/7 customer support and 1-year free warranty',
    company: {
      headPicUrl: productInfo.userInfo?.headPicUrl,
      userLevelBigPic: productInfo.userInfo?.userLevelBigPic,
      name: productInfo.userInfo?.nickName ? `${productInfo.userInfo?.nickName}` : '',
      location: `${productInfo.userInfo?.cityName || ''} China`,
      employees: `${productInfo.userInfo?.companyScaleStr || ''} employees`,
      established: '2007-04-11 Established',
      authenticated: 'Authenticated',
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{product.title}</div>
      <div>
        <span className={styles.price}>{product.price}</span>
        <span className={styles.minOrder}>{product.minOrder}</span>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles['titleName']}>Model NO:</span>
          <span>{product.details.model}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles['titleName']}>Surface Treatment:</span>
          <span>{product.details.surfaceTreatment}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles['titleName']}>Origin:</span>
          <span>{product.details.origin}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles['titleName']}>Material:</span>
          <span>{product.details.material}</span>
        </div>
      </div>

      <div className={styles.customization}>
        <span className={styles['titleName']}>Customization: </span>
        <span>{product.customization}</span>
        <span className={styles.line}>|</span>
        <span><img width={16} height={16} src='/pencial.png' /></span>
        <span className={styles.lineText} onClick={() => handleConcat({ commodityName: product.title })}>Customized Request</span>
      </div>
      <div className={styles.samples}>
        <span className={styles['titleName']}>Samples: </span>
        <span className={styles['samplePrice']}>{product.samples}</span>
      </div>
      <div className={styles.samples}>
        <span className={styles['cuz']}>Samples: </span>
        <span className={styles['sampleCuz']} onClick={() => handleConcat({ commodityName: product.title })}>
          <img src='/textRemark.png' width={16} height={16} />
          <span className={styles['cuzText']}>Request Sample</span>
        </span>
      </div>
      <div className={styles.support}>
        <span className={styles['titleName']}>After-sales support: </span>
        <span className={styles.supportContent}>{product.support}</span>
      </div>

      <div className={styles.company} onClick={() => handleRouterDetail(productInfo.userId, router, isEn, 'enterPrise')}>

        <div className={styles.companyDetails}>
          <div className={styles.companyName}>
            <img
              className={styles.companyLogo}
              src={`${product.company?.headPicUrl || "/ic_default_avator.png"}`}
              alt="avatar icon"
            />{product.company.name}  {product.company?.userLevelBigPic && <img
              className={styles.levelLogo}
              src={`${product.company?.userLevelBigPic}`}
              alt="avatar icon"
            />}
          </div>
          {/* <div>{product.company.location}</div> */}

          <div className={styles.samples}>
            <span className={styles['titleName']}>{product.company.location}</span>
            <span className={styles['sampleAuth']}><img
              className={styles.authLogo}
              src={`${product.company?.userLevelBigPic2 || "/auth.png"}`}
              alt="avatar icon"
            />{'Authenticated'}</span>
          </div>

          <div className={styles.samples}>
            <span className={styles['titleName']}>{product.company.employees}</span>
            <span className={styles['established']}>{product.company.established}</span>
          </div>

        </div>
      </div >
      <button className={`${styles.button} ${styles.contactButton}`} onClick={() => handleConcat({ commodityName: product.title })}>Contact</button>
      <div className={styles.messengerContainer}>
        <button className={styles.messengerButton} onClick={() => { setCodeVisible(true) }}>
          <Image src='/mes.png' width='22' height="22" alt="bincial" />
          <span style={{ marginLeft: '2px' }}>Messenger</span>
        </button>
      </div>
      {/* <div className={styles.messenger}>Messenger</div> */}

      <QRcodeModal visible={codeVisible} setCodeVisible={setCodeVisible} />
    </div >
  );
};

export default ProductPage;