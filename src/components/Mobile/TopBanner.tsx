import React, { memo } from 'react'
import Image from "next/image";
import { LeftOutline } from 'antd-mobile-icons';
import styles from './index.module.less'


function TopBanner({ isEn, handleChangeBlur, downLoadVisible, isPopupOpen, handleOpen, queryMobileType, setDownLoadVisible }) {
    return (
        <section className={`${isPopupOpen ? styles['isPopupOpen'] : ''}`}>
            {downLoadVisible ?
                <> <section className={styles['downLoad']} style={{ background: downLoadVisible ? '#F6FDF9' : '#ffffff' }}>
                    <section className={styles['downLoad-content']}>
                        <section className={styles['logo']}>
                            <Image
                                alt="bincial"
                                priority
                                src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-21/84e0023f-9f73-461f-83e8-c43acf92c787.png'
                                width={51}
                                height={51}
                                style={{
                                    borderRadius: 6
                                }}
                            />

                        </section>
                        <section className={styles['info']}>
                            <section className={styles['title']}>
                                Bincial - B2B
                            </section>
                            <section className={styles['sub-title']}>Social Commerce</section>
                            <section className={styles['sub-title-des']}>Meet 5000+ China Suppliers</section>

                        </section>
                        <section className={styles['open']} onClick={() => handleOpen(queryMobileType(), isEn)}>
                            Open
                        </section>
                        <section className={styles['close']} onClick={() => setDownLoadVisible(false)}>
                            <Image
                                alt="bincial"
                                width={16}
                                priority
                                height={16}
                                style={{ borderRadius: 6 }}
                                src="https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-21/6e1f369e-5f15-4216-92b1-cff839bb59dd.png" />
                        </section>
                    </section>
                </section>
                    <section className={styles['wrapImage']}>
                        <Image
                            priority
                            alt="bincial"
                            width={371}
                            height={148}
                            style={{ borderRadius: 6 }}
                            src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-21/4b7d2158-4206-4758-8db0-d70068064194.png'
                        />
                    </section>
                </> : (
                    <>
                        <section className={styles['menu-box']}>
                            <section className={styles['menu-arrow']} onClick={() => handleChangeBlur()}><LeftOutline style={{ color: '#000000' }} /></section>
                            <h1>Search</h1>
                        </section>
                        <section className={styles['box']}></section>
                    </>
                )
            }

        </section>
    )
}


export default memo(TopBanner)