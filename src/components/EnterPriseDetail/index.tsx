'use client'

import React, { useState, useRef, useEffect } from 'react';
import withSuspense from '@/hoc';
import { Image as AntdImage, message } from 'antd';

import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';
import styles from './index.module.less';
import { useTranslations, useLocale } from 'next-intl';
import useStore from '@/store/index';
import { useRouter } from 'next/navigation';
import SearchWrap from '@/components/SearchWrap';
import MotorList from '@/components/MotorList';
import InquiryModal from '@/components/InquiryModal';
import QRcodeModal from '@/components/QRcodeModal';
import Contact from '@/components/Contact'

const Footer = withSuspense(dynamic(() => import('@/components/Footer'), { ssr: true }));




const CompanyProfile = ({ params, companyInfo }) => {
  const [InquiryVisible, setInquiryVisible] = useState(false);

  const router = useRouter();
  const locale = useLocale();
  const [errors, setErrors] = useState({});
  const isEn = locale === 'en'
  const [codeVisible, setCodeVisible] = useState(false)
  const [productTitle, setProductTitle] = useState('');
  const [inquirySuccessModal, setInquirySuccessModal] = useState(false);


  const data = {
    modelNo: 'TSH',
    outputSignalType: 'Analog Type',
    feature: 'Corrosion Resistant',
    productionProcess: 'Normal Wirewound',
    leadTime: {
      quantity: [
        { title: 'Quantity (pieces)', range: '1 - 1', days: '2' },
        { title: 'Trade Capacity (days)', range: '> 1', days: 'To be negotiated' }
      ]
    },
    productDescription: '',
    detailPicUrlList: '',
    certifications: [
      { src: 'https://Image.made-in-china.com/226f3j00NPcvlTDznekM/USB3-0-USB2-0-HDMI-Audio-Video-Capture-Card-Support-1080P-60Hz.webp', alt: 'EU 2015/863' },
      { src: 'https://Image.made-in-china.com/226f3j00NPcvlTDznekM/USB3-0-USB2-0-HDMI-Audio-Video-Capture-Card-Support-1080P-60Hz.webp', alt: 'CE' }
    ]
  };

  const mockData = {
    userLevelPic: companyInfo?.userLevelPic,
    headPicUrl: companyInfo?.headPicUrl || '/avator.png',
    companyName: isEn ? companyInfo?.englishName : companyInfo?.companyName || 'Shenzhen Sensor And Cintrol Company Limited',
    location: 'China',
    industry: 'New energy',
    employees: `${companyInfo?.position || 0} employees`,
    established: '2007-04-11',
    authenticated: true,
    images: [
      { id: 1, src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', alt: 'AntdImage 1' },
      { id: 2, src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', alt: 'AntdImage 2' },
      { id: 3, src: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-07-04/018e9047-d5cb-492c-bdf3-fd802ee4493a.png', alt: 'AntdImage 3' }
    ],
    businessType: 'Manufacturer/Factory & Trading Company',
    numberOfEmployees: 37,
    yearOfEstablishment: '2007-04-11',
    certifications: ['ISO9001:2015', 'ISO14001:2015']
  };



  const [selectedImage, setSelectedImage] = useState(mockData.images[0]);
  const basicInfoRef = useRef(null);
  const leadTimeRef = useRef(null);
  const productDescriptionRef = useRef(null);
  const certificationsRef = useRef(null);
  const productsRef = useRef(null);
  const [activeTab, setActiveTab] = useState('basic')




  const handleNextImage = () => {
    const currentIndex = mockData.images.findIndex(AntdImage => AntdImage.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % mockData.images.length;
    setSelectedImage(mockData.images[nextIndex]);
  };

  const handlePrevImage = () => {
    const currentIndex = mockData.images.findIndex(AntdImage => AntdImage.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + mockData.images.length) % mockData.images.length;
    setSelectedImage(mockData.images[prevIndex]);
  };

  const searchProps = {
    router
  }

  const handleScroll = (ref, type, offset = -100) => {
    setActiveTab(type)
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.scrollBy(0, offset);
    }, 500); // 调整延迟时间以确保滚动完成
  };

  // useEffect(() => {
  //   getCompanyInfo({ id: params.id }, locale).then(res => {

  //     if (res.code === 200) {
  //       setCompanyInfo(res.userInfo);
  //     } else {
  //       message.error(res.msg)
  //     }
  //   })
  // }, [])



  // const InquiryProps = {
  //   errors,
  //   visible: InquiryVisible,
  //   setVisible: setInquiryVisible,
  //   formData: formData,
  //   handleChange: handleInquiryChange,
  //   handleOk: handleOk,
  // }


  return (
    <Layout curActive='/enterPrise'>
      <div className={styles.wrap}>
        <SearchWrap {...searchProps} />


        <div className={styles.companyProfile}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img width={60} height={60} src={mockData.headPicUrl || '/avator.png'} alt="Company Logo" />
            </div>
            <div className={styles.info}>
              <div className={styles.companyName}>{mockData.companyName}{companyInfo?.userLevelPic && <img style={{ marginLeft: '8px' }} width={32} height={16} src={companyInfo?.userLevelPic} />}</div>
              <p className={styles.rowLine}> <img src='/china.png' width={16} height={16} style={{ marginRight: '4px' }} />{mockData.location} ・ {mockData.industry} ・ {mockData.employees} ・ {mockData.established} Established ・<img src='/hasAuth.png' width={16} height={16} style={{ marginRight: '4px' }} />  {mockData.authenticated ? 'Authenticated' : 'Not Authenticated'}</p>
            </div>
          </div>



          <div className={styles.content}>
            <div className={styles.imageGallery}>
              {/* <button onClick={handlePrevImage} className={styles.navButton}>←</button> */}
              <img src={selectedImage.src} alt={selectedImage.alt} className={styles.mainImage} />
              {/* <button onClick={handleNextImage} className={styles.navButton}>→</button> */}
            </div>

            <div className={styles.contentRow}>
              <div className={styles.container}>
                <div className={styles.tabs}>
                  <span onClick={() => handleScroll(basicInfoRef, 'basic')} className={activeTab === 'basic' ? styles.activeTab : ''}>Company Profile</span>
                  <span onClick={() => handleScroll(leadTimeRef, 'lead')} className={activeTab === 'lead' ? styles.activeTab : ''}>Trade Capacity</span>
                  <span onClick={() => handleScroll(productDescriptionRef, 'productDes')} className={activeTab === 'productDes' ? styles.activeTab : ''}>Production Capacity</span>
                  <span onClick={() => handleScroll(certificationsRef, 'cert')} className={activeTab === 'cert' ? styles.activeTab : ''}>Certifications</span>
                  <span onClick={() => handleScroll(productsRef, 'product')} className={activeTab === 'product' ? styles.activeTab : ''}>Products</span>

                </div>
                <div className={styles.content2}>
                  <div className={styles.section} ref={basicInfoRef}>
                    <h2 className={styles.cardTitle}>Company Profile</h2>
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
                    <h2 className={styles.cardTitle}>Trade Capacity</h2>
                    <table className={styles.table}>
                      <tbody>
                        {data.leadTime.quantity.map((item, index) => (
                          <tr key={index}>
                            <td className={styles.tableHeader}>{item.title}</td>
                            <td>{item.range}</td>
                            <td>{item.days}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className={styles.section} ref={productDescriptionRef}>
                    <h2 className={styles.cardTitle}>Production Capacity</h2>
                    <p>{data?.productDescription || ''}</p>
                    {/* {data?.certifications?.map(i => {
                      return <AntdImage.PreviewGroup><AntdImage src={i.src} alt="detail" className={styles['detail-pic']} /></AntdImage.PreviewGroup>
                    })} */}
                  </div>

                  <div className={styles.section} ref={certificationsRef}>
                    <h2 className={styles.cardTitle}>Certifications</h2>
                    <div className={styles.certifications}>
                      <AntdImage.PreviewGroup>
                        {data.certifications.map((cert, index) => (

                          <AntdImage key={index} src={cert.src} alt={cert.alt} />

                        ))}
                      </AntdImage.PreviewGroup>
                    </div>
                  </div>
                </div>

                <div className={styles.section} ref={productsRef}>
                  <h2 className={styles.cardTitle}>Products</h2>
                  <div className={styles.Products}>
                    <MotorList id={params.id} type="company" />
                  </div>
                </div>
                <Contact shopDetail />
              </div>

              <div className={styles.columnLeft}>
                <div className={styles.contact}>
                  <span className={styles.contactTitle}>Contact supplier</span>
                  <div className={styles.contactInfo}>
                    <div className={styles.logo}>
                      <img width={60} height={60} src={mockData.headPicUrl} alt="Company Logo" />
                    </div>
                    <p className={styles.companyNameSmall}>{mockData.companyName}</p>
                  </div>
                  <button className={styles.contactButton} onClick={() => setInquiryVisible(true)}>Contact</button>

                </div>
                <div className={styles.messengerContainer}>
                  <button className={styles.messengerButton} onClick={() => { setCodeVisible(true) }}>
                    <img src='/mes.png' width='22' height="22" alt="bincial" />
                    <span style={{ marginLeft: '2px' }}>Messenger</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>



      <Footer />
      <QRcodeModal visible={codeVisible} setCodeVisible={setCodeVisible} />
      <InquiryModal productTitle={productTitle} visible={InquiryVisible} setVisible={setInquiryVisible} type="enterprise" />

    </Layout >
  );
};

export default CompanyProfile;