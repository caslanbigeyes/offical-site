import React from 'react'
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import styles from './index.module.less';


const { Header, Content, Footer, Sider } = Layout;


export default function Index() {
    const router = useRouter();

    const handleJump = (key: string) => {
        router.push(key)
    }
    const t = useTranslations('global');
    const locale = useLocale();
    return (
        <Footer className={styles.footer} style={{ textAlign: 'center', padding: 0, width: '100%' }}>
            <div className={styles.wrap}>
                <div className={styles.row1}>
                    <div className={styles.colOne}>
                        <Image
                            src="/footlogo.png"
                            alt="bincial"
                            width={80}
                            height={60}
                            style={{ borderRadius: 6 }}
                            priority
                        />
                        <div className={`${styles['text-wrapper_40']}`}>
                            <span className={`${styles['text_78']}`}>{t("companyName")}</span>
                            <span className={`${styles['text_79']}`}>
                                {t("companyIntroduce")}
                            </span>
                        </div>
                    </div>
                    <div className={styles.colTwo}>
                        <div className={`${styles['text-wrapper_38']}`}>
                            <span className={`${styles['text_73']}`}>{t("Quick entrance")}</span>
                            <span className={`${styles['text_74']}`} onClick={() => handleJump('/home')}>{t("home page")}</span>
                            <span className={`${styles['text_74']}`} onClick={() => handleJump('/products')}>{t("products and services")}</span>
                            <span className={`${styles['text_74']}`} onClick={() => handleJump('/about')}>{t("about us")}</span>
                            <span className={`${styles['text_74']}`} onClick={() => handleJump('/help')}>{t("help center")}</span>
                        </div>
                    </div>
                    <div className={styles.colThree}>
                        <div className={`${styles['group_41']}`}>
                            <span className={`${styles['text_75']}`}>{t("contactUs")}</span>
                            <div className={`${styles['text-wrapper_39']}`}>

                                <span>{t("Collab：")}</span>
                                <span>135-8566-0971</span>

                            </div>
                            <div className={`${styles['text-wrapper_39']} `}>
                                <span>{t("Support：")}</span>
                                <span>010-6666666</span>


                            </div>
                            <div className={`${styles['text-wrapper_39']}`}>
                                <span>{t("Link：")}</span>
                                <span>admin&#64;bincial.com</span>


                            </div>
                            <div className={`${styles['text-wrapper_39']} `}>
                                <span>{t("Addr：")}</span>
                                <span>{t("address")}</span>


                            </div>
                        </div>
                    </div>
                    <div className={styles.colFour}>

                        <div className={`${styles['image-text_39']}`}>
                            <Image
                                src="/App.png"
                                alt="bincial"
                                width={69}
                                height={69}
                                style={{ borderRadius: 6 }}
                                priority
                            />
                            <span className={`${styles['text-group_10']}`}>{t("Download")}</span>
                        </div>
                        <div className={`${styles['image-text_40']}`}>
                            <Image
                                src="/gzh.jpeg"
                                alt="bincial"
                                width={69}
                                height={69}
                                style={{ borderRadius: 6 }}
                                priority
                            />
                            <span className={`${styles['text-group_11']}`}>{t("WeChat")}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.row2}>
                    <div className={`${styles['image-text_41']}`} >
                        <a className={styles.alink} href='http://www.bincial.com/policy.html'> {t("footerPolicy")}</a>｜  <a className={styles.alink} href="http://www.bincial.com/user.html">  {t("footerAgreement")}</a>
                    </div>
                    <a className={`${styles['image-text_42']}`} href='https://beian.miit.gov.cn/#/Integrated/index'>
                        {t("footerCompany")}
                    </a>
                </div>
            </div>
        </Footer>
    )
}
