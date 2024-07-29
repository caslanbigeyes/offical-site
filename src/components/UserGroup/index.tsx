import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";
import styles from './index.module.less';


export default function Index() {
    const t = useTranslations('global');
    const locale = useLocale();
    const isEn = locale === 'en'
    const useLists = [{
        url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/939bb046-6645-462a-bb12-b6eb65797d9c.png',
        name: t("Purchaser"),
        des1: t("userDes1"),
        des2: t("userDes2"),

    },
    {
        url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/6f70d7bd-0c1a-495e-8306-df62d3129169.png',
        name: t("Suppliers"),
        des1: t("userDes3"),
        des2: t("userDes4"),
    },
    {
        url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/42b9b3b9-c15c-4e4b-a4e3-911642543d6f.png',
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
                                priority
                                src={i.url}
                                alt={`${i.name}`}
                                width={328}
                                height={223}
                                style={{ borderRadius: 6 }}
                            />
                            <div className={styles.bottom}>
                                <div className={styles.bottomName}>
                                    {i.name}
                                </div>
                                <div className={styles.des}>
                                    <div className={styles.des2} style={{ height: isEn ? '50px' : 'unset' }}>{i.des1}</div>
                                    <div className={styles.des2} style={{ height: isEn ? '50px' : 'unset' }}>{i.des2}</div>
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
                    priority
                    src={isEn ? "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/da3b88bf-dcf3-4497-be4b-015dafe88062.png" : "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/6dfca5b1-99f2-4ce8-9d92-12052ddd8836.png"}
                    alt="bincial"
                    width={1920}
                    height={315}
                    style={{ width: '100%' }}
                />
            </div>
        </>
    )
}