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
        des2: t("globalDes1W"),
        des3: '',

        title: t("Products Info Gap"),
    },
    {
        des: t("globalDes2"),
        des2: t("globalDes2W"),
        des3: t("globalDes2Y"),

        title: t("Manufacturer Info Gap"),
    },
    {
        des: t("globalDes3"),
        des2: t("globalDes3W"),
        des3: t("globalDes3Y"),

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
                                <div className={styles.boxBottom} style={{ height: isEn ? 'unset' : '119px' }}>
                                    {isEn ? <div className={styles.boxBottomContent} style={{ height: isEn ? 'unset' : '119px' }}>
                                        {i.des}
                                    </div> : <div className={styles.boxBottomContent} style={{ height: isEn ? 'unset' : '119px' }}>
                                        {i.des}<div>{i.des2}</div><div>{i.des3}</div>
                                    </div>}
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
            <div className={styles.tipOne}>
                <Image
                    src={isEn ? "/fullEn1.png" : "/full1.png"}
                    alt="bincial"
                    width={990}
                    height={513}
                    
                    priority
                />
            </div>
            <div className={styles.tipTwo}>
                <Image
                    src={isEn ? "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-31/1014bc19-f493-467a-b839-c4963b3380d8.png" : "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-31/5967c6cd-2e3b-4fd6-b2ae-63fa31e2d1c4.png"}
                    alt="bincial"
                    width={990}
                    height={513}
                   
                    priority
                />
            </div>
            <div className={styles.tipThree}>
                <Image
                    src={isEn ? "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-31/4d656518-770f-4b4b-a407-4a7232bdc4ce.png" : "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-31/fea8261e-5d97-4283-983c-da79b3869d59.png"}
                    alt="bincial"
                    width={990}
                    height={513}
                  
                    priority
                />
            </div>
            <div className={styles.tipFour}>
                <Image
                    src={isEn ? "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-31/994d7b97-850a-4323-ac5a-4b678e921063.png" : "https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-03/a49051ab-e0a2-4b4f-9dc4-a6be84541f3b.png"}
                    alt="bincial"
                    width={990}
                    height={513}
                   
                    priority
                />
            </div>
        </>
    )
}
