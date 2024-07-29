'use client'
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import QRCode from 'qrcode.react';
import styles from './index.module.less'

export default function Index({ visible, setCodeVisible }) {

    const [fullUrl, setFullUrl] = useState('');

    useEffect(() => {
        // 确保这段代码只在客户端运行  
        if (typeof window !== 'undefined') {
            const url = `${window.location.protocol}/${window.location.host}${window.location.pathname}${window.location.search}`;
            setFullUrl(url);
        }
    }, []); // 空依赖数组表示这个 effect 只在组件挂载时运行一次 
    return (
        <div>
            <Modal title={null} visible={visible} footer={null} maskClosable={true} onCancel={() => setCodeVisible(false)}  >
                <div className={styles['download']}>
                    <div className={styles['downloadCol']}>
                        <div className={styles['downloadColBd']}>
                            <QRCode
                                id={String(Math.random() * 1000)}
                                value={fullUrl}
                                size={105} // 二维码的大小
                                fgColor="#000000" // 二维码的颜色
                            />
                        </div>
                    </div>
                    <div className={styles.downText}>
                        <div className={styles.textTip}>Please scan the QR code to download Bincial APP.
                        </div>
                        <div className={styles.textTip}> Find products, communicate with suppliers in Bincial APP anytime and anywhere.</div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}
