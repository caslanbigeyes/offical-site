'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Image } from 'antd';
import Contact from '../Contact';
import MotorList from '../MotorList';
import ReactImageMagnify from 'react-image-magnify';
import styles from './index.module.less';

const mockData = [
  { id: 1, src: '/3x.png', alt: 'Image 1' },
  { id: 2, src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', alt: 'Image 2' },
  { id: 3, src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', alt: 'Image 3' },
  { id: 4, src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', alt: 'Image 4' },
  { id: 5, src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', alt: 'Image 5' },
  { id: 6, src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', alt: 'Image 6' }
];

function convertUrlsToGallery(urls) {
  let id = 1; // 初始化ID  
  return urls.map(url => ({
    ...url,
    id: id++, // 为每个对象分配一个递增的ID  
    alt: `Image ${id}`, // 分配一个基于ID的alt文本  
    src: url.cover, // Use cover for images and uri for videos
    uri: url.uri,
    type: url.duration ? 'video' : 'image', // Determine type based on presence of cover
    duration: url.duration,
    width: url.width,
    height: url.height,
  })).sort((a, b) => {
    if (a.uri && !b.uri) {
      return 1;
    } else if (!a.uri && b.uri) {
      return -1;
    } else {
      return 0;
    }
  });
}

const ImageGallery = ({ productInfo={}, id }) => {
  const t = useTranslations('global');
  const locale = useLocale();
  const isEn = locale === 'en';
  const revertImages = convertUrlsToGallery(productInfo?.coverList?.length > 5 ? productInfo?.coverList : productInfo?.coverList || []);
  const [selectedImage, setSelectedImage] = useState(mockData[0]);
  const [visibleImages, setVisibleImages] = useState(revertImages.slice(0, 5));
  const [startIndex, setStartIndex] = useState(0);
  const basicInfoRef = useRef(null);
  const leadTimeRef = useRef(null);
  const productDescriptionRef = useRef(null);
  const certificationsRef = useRef(null);
  const [activeTab, setActiveTab] = useState('basic')


  const data = {
    modelNo: 'TSH',
    outputSignalType: 'Analog Type',
    feature: 'Corrosion Resistant',
    productionProcess: 'Normal Wirewound',
    leadTime: {
      quantity: [
        { title: 'Quantity (pieces)', range: '1 - 1', days: '2' },
        { title: 'Lead time (days)', range: '> 1', days: 'To be negotiated' }
      ]
    },
    productDescription: isEn ? `${productInfo.contentEn || ''}` : `${productInfo.content || ''}`,
    detailPicUrlList: `${productInfo.detailPicUrlList}`,
    certifications: [
      { src: 'https://image.made-in-china.com/226f3j00NPcvlTDznekM/USB3-0-USB2-0-HDMI-Audio-Video-Capture-Card-Support-1080P-60Hz.webp', alt: 'EU 2015/863' },
      { src: 'https://image.made-in-china.com/226f3j00NPcvlTDznekM/USB3-0-USB2-0-HDMI-Audio-Video-Capture-Card-Support-1080P-60Hz.webp', alt: 'CE' }
    ]
  };

  const handleScroll = (ref, tab, offset = -80) => {
    setActiveTab(tab);
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.scrollBy(0, offset);
    }, 500); // 调整延迟时间以确保滚动完成
  };

  const handleNextImage = () => {
    const newStartIndex = startIndex + 1;
    if (newStartIndex + 5 <= revertImages.length) {
      setStartIndex(newStartIndex);
      setVisibleImages(revertImages.slice(newStartIndex, newStartIndex + 5));
    }
  };

  const handlePrevImage = () => {
    const newStartIndex = startIndex - 1;
    if (newStartIndex >= 0) {
      setStartIndex(newStartIndex);
      setVisibleImages(revertImages.slice(newStartIndex, newStartIndex + 5));
    }
  };

  const handleLeftImage = () => {
    const currentIndex = revertImages.findIndex(image => image.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % revertImages.length;
    setSelectedImage(revertImages[nextIndex]);
  };

  const handleRightImage = () => {
    const currentIndex = revertImages.findIndex(image => image.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + revertImages.length) % revertImages.length;
    setSelectedImage(revertImages[prevIndex]);
  };

  useEffect(() => {
    if (revertImages.length) {
      setSelectedImage(revertImages[0]);
      setVisibleImages(revertImages.slice(0, 5));
    }
  }, [revertImages.length]);

  const isShowArrow = revertImages.length > 1;

  return (
    <div className={styles.wrapGallery}>
      <div className={styles.galleryContainer}>
        {isShowArrow && <div className={styles.thumbnailContainer}>
          {startIndex > 0 && (
            <button onClick={handlePrevImage} className={styles.navButton}>
              <img src='/upArrow.png' className={styles.arrowRotate} />
            </button>
          )}
          {visibleImages.map(image => (
            <img
              key={`${Math.random()}`}
              src={image.src}
              alt={image.alt}
              className={image.id === selectedImage.id ? styles.selectedThumbnail : styles.thumbnail}
              onClick={() => setSelectedImage(image)}
            />
          ))}
          {startIndex + 5 < revertImages.length && (
            <button onClick={handleNextImage} className={styles.navButton}>
              <img src='/bottomArrow.png' className={styles.arrowRotate} />
            </button>
          )}
        </div>}
        <div className={styles.mainImageContainer}>
          {isShowArrow && <button onClick={handleLeftImage} className={styles.navButton}>
            <img src='/leftA.png' className={styles.arrowRotateRow} />
          </button>}
          <div className={styles.imgWrap}>
            {selectedImage.type !== 'video' ? (
              <Image.PreviewGroup>
                <Image src={selectedImage.src} style={{ width: isShowArrow ? '400px' : '490px', height: '400px' }} alt={selectedImage.alt} className={styles.mainImage} />
              </Image.PreviewGroup>
            ) : (
              <video controls style={{ width: '400px', height: '400px' }} className={styles.mainImage}>
                <source src={selectedImage.uri} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {isShowArrow && <button onClick={handleRightImage} className={styles.navButton}>
            <img src='/rightA.png' className={styles.arrowRotateRow} />
          </button>}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.tabs}>
          <span onClick={() => handleScroll(basicInfoRef, 'basic')} className={activeTab === 'basic' ? styles.activeTab : ''}>Basic Info.</span>
          <span onClick={() => handleScroll(leadTimeRef, 'lead')} className={activeTab === 'lead' ? styles.activeTab : ''}>Lead time</span>
          <span onClick={() => handleScroll(productDescriptionRef, 'product')} className={activeTab === 'product' ? styles.activeTab : ''}>Product Description</span>
          <span onClick={() => handleScroll(certificationsRef, 'cert')} className={activeTab === 'cert' ? styles.activeTab : ''}>Certifications</span>
        </div>
        <div className={styles.content}>
          <div className={styles.section} ref={basicInfoRef}>
            <h2 className={styles.cardTitle}>Basic Info.</h2>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.tableHeader}>Model NO.</td>
                  <td>{data.modelNo}</td>
                </tr>
                <tr>
                  <td className={styles.tableHeader}>Output Signal Type</td>
                  <td>{data.outputSignalType}</td>
                </tr>
                <tr>
                  <td className={styles.tableHeader}>Feature</td>
                  <td>{data.feature}</td>
                </tr>
                <tr>
                  <td className={styles.tableHeader}>Production Process</td>
                  <td>{data.productionProcess}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.section} ref={leadTimeRef}>
            <h2 className={styles.cardTitle}>Lead time</h2>
            <table className={styles.table}>
              <tbody>
                {data.leadTime.quantity.map((item, index) => (
                  <tr key={`${Math.random()}`}>
                    <td className={styles.tableHeader}>{item.title}</td>
                    <td>{item.range}</td>
                    <td>{item.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.section} ref={productDescriptionRef}>
            <h2 className={styles.cardTitle}>Product Description</h2>
            <p>{data?.productDescription || ''}</p>
            <Image.PreviewGroup>
              {productInfo?.detailPicUrlList?.map(i => {
                return <Image src={i} alt="detail" className={styles['detail-pic']} key={Math.random()} />
              })}
            </Image.PreviewGroup>
          </div>
          <div className={styles.section} ref={certificationsRef}>
            <h2 className={styles.cardTitle}>Certifications</h2>
            <div className={styles.certifications}>
              <Image.PreviewGroup>
                {data.certifications.map((cert, index) => (

                  <Image src={cert.src} alt={cert.alt} key={`${Math.random()}`} />

                ))}
              </Image.PreviewGroup>
            </div>
          </div>
        </div>
      </div>

      <Contact shopDetail />
      <MotorList id={id} />
    </div>
  );
};

export default ImageGallery;
