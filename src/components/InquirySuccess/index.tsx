import React from 'react';
import { Modal } from 'antd';
import QRCode from 'qrcode.react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './index.module.less'; // 假设你的样式文件名为 YourStyles.module.css

const InquirySuccessModal = ({ visible, onClose }) => {
    const locale = useLocale();
    const isEn = locale === 'en'
    const t = useTranslations('global');
    return (
        <Modal
            visible={visible}
            footer={null}
            onCancel={onClose}
            className={styles['modal-container']}
        >
            <div className={styles['modal-content']}>
                <h2 className={styles['modal-title']}>{t('subTip')}</h2>
                <p className={styles['modal-message']}>
                   {t('subSuccess')}
                </p>
                <div className={styles['qr-code-container']}>
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
        </Modal>
    );
};

export default InquirySuccessModal;