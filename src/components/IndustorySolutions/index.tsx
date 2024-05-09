import React from 'react'
import styles from './index.module.less'
import { useLocale, useTranslations } from 'next-intl';

import Image from "next/image";


export default function Index() {
    const t = useTranslations('global');
    const locale = useLocale();
    const isEn = locale === 'en'

    const solutions = [{
        des: t("globalDes1"),
        title: t("Products Info Gap"),
    },
    {
        des: t("globalDes2"),
        title: t("Manufacturer Info Gap"),
    },
    {
        des: t("globalDes3"),
        title: t("Industry Info Gap")
    }]

    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.toptitle}>{t("Industry")}</div>
                <div className={styles.bottom}>
                    {
                        solutions.map(i => (
                            <div className={styles.box} key={i.title}>
                                <div className={styles.boxTop}>
                                    <div className={styles.boxTopText}>
                                        {i.title}
                                    </div>
                                </div>
                                <div className={styles.boxBottom}>
                                    <div className={styles.boxBottomContent}>
                                        {i.des}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
            <div className={styles.tipOne}>
                <Image
                    src={isEn ? "/tipOneEn.png" : "/tipOne1.png"}
                    alt="bincial"
                    width={990}
                    height={513}
                    style={{ borderRadius: 6, }}
                    priority
                />
            </div>
            <div className={styles.tipTwo}>
                <Image
                    src={isEn ? "/tipTwoEn.png" : "/tipTwo.png"}
                    alt="bincial"
                    width={990}
                    height={513}
                    style={{ borderRadius: 6 }}
                    priority
                />
            </div>
            <div className={styles.tipThree}>
                <Image
                    src={isEn ? "/tipThreeEn.png" : "/tipThree.png"}
                    alt="bincial"
                    width={990}
                    height={513}
                    style={{ borderRadius: 6 }}
                    priority
                />
            </div>
            <div className={styles.tipFour}>
                <Image
                    src={isEn ? "/tipFourEn.png" : "/tipFour.png"}
                    alt="bincial"
                    width={990}
                    height={513}
                    style={{ borderRadius: 6 }}
                    priority
                />
            </div>
        </>
    )
}
