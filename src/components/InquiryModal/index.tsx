import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, message } from 'antd';
import QRCode from 'qrcode.react';
import { addProductsInfo } from '@/api';
import InquirySuccess from '@/components/InquirySuccess';
import { useLocale, useTranslations } from 'next-intl';


import styles from './index.module.less';

const InquiryModal = ({ visible, setVisible, productTitle, type }) => {
    const locale = useLocale();
    const isEn = locale === 'en'
    const t = useTranslations('global');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: type === "enterprise" ? undefined : productTitle,
        number: type === "enterprise" ? undefined : 1,
        email: '',
        // userName: '',
        // companyName: '',
        remarks: '',
    });

    const [inquirySuccessModal, setInquirySuccessModal] = useState(false);

    useEffect(() => {
        if (productTitle) {
            setFormData({ ...formData, name: productTitle })
        }
    }, [productTitle])



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
                    // 点击按钮时触发的转化跟踪事件
                    setFormData({
                        name: '',
                        number: 1,
                        email: '',
                        // userName: '',
                        // companyName: ''
                    })
                    setVisible(false)
                    message.success(res.msg)
                    setInquirySuccessModal(true);
                    setErrors({});
                } else {
                    message.error(res.msg)
                }
            })
        }
    }

    const handleCancel = () => {
        setVisible(false);
    };

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


    return (
        <>
            <Modal
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width={800}
                centered
                className={styles['modal']}
            >
                <div className={styles['left']}>
                    <div>
                        <p>{t('communication')}</p>
                        {isEn ? <QRCode
                            id={String(Math.random() * 1000)}
                            value='https://xiaoluo.xiaoluoapp.com/web/#/h5/openAppLink?isEn=true'
                            size={105} // 二维码的大小
                            fgColor="#000000" // 二维码的颜色
                        /> : <QRCode
                            id={String(Math.random() * 1000)}
                            value='https://xiaoluo.xiaoluoapp.com/web/#/h5/openAppLink?isEn=false'
                            size={105} // 二维码的大小
                            fgColor="#000000" // 二维码的颜色
                        />}

                    </div>
                </div>
                <div className={styles['right']}>
                    <div className={styles['title']}>{t('Inquiry')}</div>
                    {type !== 'enterprise' && <div className={styles['form-item']}>
                        <label>{t('Product')}<span className={styles['error']}>*</span></label>
                        <Input required className={styles.inp} name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <span className={styles['error']}>{errors.name}</span>}
                    </div>}
                    {type !== 'enterprise' && <div className={styles['form-item']}>
                        <label>{t('Quantity')}</label>
                        <Input min={1} className={styles.inp} name="number" value={formData.number} onChange={handleChange} />
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
                    {/* <div className={styles['form-item']}>
                        <label>Full Name</label>
                        <Input className={styles.inp} name="userName" value={formData.userName} placeholder={t('FullName')} onChange={handleChange} />
                    </div>
                    <div className={styles['form-item']}>
                        <label>Company Name</label>
                        <Input className={styles.inp} name="companyName" value={formData.companyName} placeholder={t('CompanyName')} onChange={handleChange} />
                    </div> */}
                    <button className={styles['submit-btn']} onClick={handleOk}>
                        {t('submit')}
                    </button>
                </div>
            </Modal>

            <InquirySuccess visible={inquirySuccessModal} onClose={() => setInquirySuccessModal(false)} />
        </>
    );
};

export default InquiryModal;