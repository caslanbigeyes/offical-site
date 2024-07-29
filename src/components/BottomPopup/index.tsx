// src/BottomPopup.js
import React, { memo } from 'react';
import styles from './index.module.less';
import { Popup } from 'antd-mobile'

const BottomPopup = ({ isOpen, onClose, sendInquiry, formData, handleChange, errors = {} }) => {
    return (
        <Popup
            visible={isOpen}
            onMaskClick={onClose}
            onClose={onClose}
            bodyStyle={{ height: '40vh' }}
        >
            <div className={`${styles['popup-container']} ${isOpen ? styles['open'] : ''}`}>
                <div className={styles['popup-content']}>
                    <button className={styles["close-button"]} onClick={onClose}>×</button>
                    <h2 className={styles['title']}>Send Inquiry</h2>
                    <form className={styles['form']}>
                        <label className={styles['label']}>Product<span className={styles['error']}>*</span></label>
                        <input required name="name" type="text" className={styles['input']} value={formData.name} onChange={handleChange} />
                        {errors.name && <span className={styles['error']}>{errors.name}</span>}
                        <label className={styles['label']}>Quantity</label>
                        <input min="0" name="number" type="number" className={styles['input']} value={formData.number} onChange={handleChange} />
                        {errors.number && <span className={styles['error']}>{errors.number}</span>}
                        <label className={styles['label']}>Contact Info<span className={styles['error']}>*</span></label>
                        <input required name="email" type="text" className={styles['input']} placeholder='Email Address' value={formData.email} onChange={handleChange} />
                        {errors.email && <span className={styles['error']}>{errors.email}</span>}
                        <input name="fullName" type="text" className={styles['input']} placeholder='Full Name' value={formData.fullName} onChange={handleChange} />
                        <input name="companyName" type="text" className={styles['input']} placeholder='Company Name' value={formData.companyName} onChange={handleChange} />
                        <button type="submit" className={styles['send-button']} onClick={sendInquiry}>Send Inquiry</button>
                    </form>
                </div>
            </div>
        </Popup>




    );
};

export default memo(BottomPopup);