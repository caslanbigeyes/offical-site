import React, { useState, useEffect } from 'react';
import withSuspense from '@/hoc';
import { Modal, Input, Button, message } from 'antd';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { addProductsInfo } from '@/api'
import styles from './index.module.less'; // Import the LESS file for styling
const InquiryModal = withSuspense(dynamic(() => import('@/components/InquiryModal'), { ssr: true }));

const ProductForm = ({ type, inpValue }) => {
  const locale = useLocale();
  const isEn = locale === 'en'
  const t = useTranslations('global');
  const [errors, setErrors] = useState({});
  let productTitle = 'Basic Product Information';
  const [formData, setFormData] = useState({
    name: inpValue || '',
    number: 1,
    email: '',
    // userName: '',
    // companyName: '',
    remarks: '',
  });

  const [disableConfirm, setDisableConfirm] = useState(false);





  const validateForm = () => {
    const newErrors = {};
    if (!formData.name && type !== "enterprise") newErrors.name = 'Product name is required';
    if (!formData.remarks) {
      newErrors.remarks = 'Content is required'
    }
    if (!formData.email) {
      newErrors.email = 'Email Address is required'
    } else {
      // 校验邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }
    return newErrors;
  };

  const handleOk = (event) => {
    event.preventDefault();
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-16542173570/9vBiCKfuh78ZEIKT9s89',
      });

      window.gtagNeo('event', 'conversion', {
        'send_to': 'AW-16589036935/2fJJCJ_wrL8ZEIe7ouY9',
      });
    }
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addProductsInfo({ ...formData }).then(res => {
        if (res.code === 200) {
          Modal.success({
            closable: true,
            content: <div className={styles.imgWrap}>
              <img src="/successICon.png" alt="success" className={styles.successImg} />
              <div style={{ color: '#777C7F', fontSize: '15px', marginTop: '18px' }}>We have received your message</div>
              <div style={{ color: '#777C7F', fontSize: '15px' }}>and will contact you within 24 hours</div>
            </div>,
            footer: null,
            icon: null,
          })
          setDisableConfirm(true);
          setErrors({});
        } else {
          message.error(res.msg)
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
    }
  }
  const [InquiryVisible, setInquiryVisible] = useState(true);



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      productName,
      purchaseQuantity,
      details,
      email,
      fullName,
      companyName,
    });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['no-matches']}>
        <p className={styles.titleError}>{`Sorry! No matches were found for ${inpValue}`}</p>
        <p>You may consider to</p>
        <p>· Check search tips:</p>
        <ul>
          <p className={styles.pC}>Ensure words are spelled correctly.</p>
          <p className={styles.pC}>Insert space or comma between two or more keywords.</p>
          <p className={styles.pC}>Try less specific keywords.</p>
          <p className={styles.pC}>Try rephrasing keywords or using synonyms.</p>
        </ul>
        <p>· Tell us more about the product and get quotes within 24 hours:</p>
      </div>

      <div className={styles['right']}>
        <div className={styles['title']}>{t('Inquiry')}</div>
        {type !== 'enterprise' && <div className={styles['form-item']}>
          <label>{t('Product')}<span className={styles['error']}>*</span></label>
          <Input placeholder='Please enter the product name' required className={styles.inp} name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className={styles['error']}>{errors.name}</span>}
        </div>}
        {type !== 'enterprise' && <div className={styles['form-item']}>
          <label>{t('Quantity')}</label>
          <Input placeholder='Please enter the quantity' type="number" min={1} className={styles.inp} name="number" value={formData.number} onChange={handleChange} />
        </div>}

        <div className={styles['form-item']}>
          <label>{t('Remarks')}<span className={styles['error']}>*</span></label>
          <Input.TextArea placeholder="Please enter details such as material, size, application, specifications and other requirements to receive an accurate quote" min={1} required showCount style={{ height: 120, resize: 'none' }} className={styles.inp} name="remarks" value={formData.remarks} onChange={handleChange} />
          {errors.remarks && <span className={styles['error']}>{errors.remarks}</span>}
        </div>

        <div className={styles['form-item']} style={{ marginTop: '22px' }}>
          <label>{t('ContactInfo')}<span className={styles['error']}>*</span></label>
          <Input required className={styles.inp} name="email" value={formData.email} placeholder={t('EmailAddress')} onChange={handleChange} />
          {errors.email && <span className={styles['error']}>{errors.email}</span>}

        </div>

        <button className={`${styles['submit-btn']} ${disableConfirm && styles['disable']}`} disabled={disableConfirm} onClick={handleOk}>
          {t('submit')}
        </button>
      </div>


    </div>
  );
};

export default ProductForm;
