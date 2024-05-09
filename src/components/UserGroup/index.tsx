import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import styles from './index.module.less';


export default function Index() {
    const t = useTranslations('global');
    const locale = useLocale();
    const isEn = locale === 'en'
    const useLists = [{
        url: '/purchase.png',
        name: t("Purchaser"),
        des1: t("userDes1"),
        des2: t("userDes2"),

    },
    {
        url: '/supplier.png',
        name: t("Suppliers"),
        des1: t("userDes3"),
        des2: t("userDes4"),
    },
    {
        url: '/company.png',
        name: t("Third-Party"),
        des1: t("userDes5"),
        des2: t("userDes6"),
    }]

    const ownUs = [{
        num: '2023',
        des: t("LANUNCHED"),
    },
    {
        num: '4000+',
        des: t("LIVE-STREAMS"),
    },
    {
        num: '5000+',
        des: t("CORPORATES"),
    },
    {
        num: '1000+',
        des: t("BIZ ACTIONS"),
    },
    {
        num: '99%',
        des: t("TOP RATE"),
    }]

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.title}>{t('userGroup')}</div>
                <div className={styles.userList}>

                    {useLists.map(i => (
                        <div className={styles.wrapRow} key={i.url}>
                            <Image
                                src={i.url}
                                alt="bincial"
                                width={328}
                                height={223}
                                priority
                                style={{ borderRadius: 6 }}
                            />
                            <div className={styles.bottom}>
                                <div className={styles.bottomName}>
                                    {i.name}
                                </div>
                                <div className={styles.des}>
                                    <div>{i.des1}</div>
                                    <div className={styles.des2}>{i.des2}</div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>


            <div className={styles.ourOwn}>
                <div className={styles.ownTitle}>{t('own')}</div>
                <div className={styles.ownConWrap}>
                    {
                        ownUs.map(i => (
                            <div className={styles.ownCon} key={i.des}>
                                <div className={styles.ownTop}>
                                    {i.num}
                                </div>
                                <div className={styles.ownBottom}>
                                    {i.des}
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>

            <div className={styles.footerPage}>
                <Image
                    src={isEn ? "/pageFooterEn.png" : "/pageFooter.png"}
                    alt="bincial"
                    width={1920}
                    height={315}
                    style={{ borderRadius: 6, width: '100%' }}
                    priority
                />
            </div>
        </>
    )
}