import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import styles from './index.module.less'

const FAQ = () => {
    const [activeSection, setActiveSection] = useState('basicInfo');
    const t = useTranslations('global');
    const locale = useLocale();
    const isEn = locale === 'en'
    const handleSectionClick = (section: string) => {
        setActiveSection(section);
    };

    const sections = [
        { id: 'basicInfo', title: '基础信息' },
        { id: 'accountSecurity', title: '账号安全' },
        { id: 'accountVerification', title: '账号认证' },
        { id: 'complainSeller', title: '投诉卖家' },
        { id: 'sellerGuide', title: '卖家必看' },
        { id: 'buyerGuide', title: '买家必看' },
        { id: 'merchantBackend', title: '商家后台' },
    ];

    return (
        <div className={styles["faq-container"]}>
            <div className={styles["faq-header"]}>
                <div>Frequently Asked Questions</div>
            </div>
            <div className={styles['faq-content']}>
                <div className={styles["faq-menu"]}>
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={`${styles['faq-menu-item']} ${activeSection === section.id ? styles['active'] : ''}`}
                            onClick={() => handleSectionClick(section.id)}
                        >
                            {section.title}
                        </div>
                    ))}
                </div>
                <div className={styles["faq-rightContent"]}>
                    {activeSection === 'basicInfo' && (
                        <div>
                            <h2 className={styles['faq-title']}>{t("helpBasicInfo1")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo2")} </p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo3")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo4")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo5")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo6")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo7")}</p>


                            <h2 className={styles['faq-title']}>{t("helpBasicInfo8")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo9")}{t("helpBasicInfo10")}
                            </p>
                            <p className={styles['faq-tip']}>   {t("helpBasicInfo11")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo12")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo13")}</p>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo14")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo15")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo16")}</p>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo17")}</h2>
                            <p className={styles['faq-tip']}> {t("helpBasicInfo18")} </p>
                            <a href="/en/policy" target='_blank' className={styles['faq-tip']}>{t("helpBasicInfo19")}</a>
                        </div>
                    )}
                    {activeSection === 'accountSecurity' && (
                        <div>
                            <h2 className={styles['faq-title']}>{t("helpBasicInfo20")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo21")} </p>
                            <a href="/en/user" target='_blank' className={styles['faq-tip']}>{t("helpBasicInfo22")}</a>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo23")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo24")} </p>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo25")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo26")} </p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo27")} </p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo28")}</p>

                        </div>
                    )}

                    {activeSection === 'accountVerification' && (
                        <div>
                            <h2 className={styles['faq-title']}>{t("helpBasicInfo29")}</h2>
                            <a className={styles['faq-tip']}>{t("helpBasicInfo30")}</a>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo31")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo32")} </p>
                        </div>
                    )}


                    {activeSection === 'complainSeller' && (
                        <div>
                            <h2 className={styles['faq-title']}>{t("helpBasicInfo33")} </h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo34")} </p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo35")} </p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo36")} </p>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo37")} </h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo38")} </p>
                        </div>
                    )}


                    {activeSection === 'sellerGuide' && (
                        <div>
                            <h2 className={styles['faq-title']}>{t("helpBasicInfo39")} </h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo40")} </p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo35")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo36")}</p>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo43")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo44")}</p>


                            <h2 className={styles['faq-title']}>{t("helpBasicInfo45")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo46")}</p>

                            <p className={styles['faq-tip']}>{t("helpBasicInfo47")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo48")}</p>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo49")}</p>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo50")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo51")}</p>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo52")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo53")}</p>

                            <h2 className={styles['faq-title']}>{t("helpBasicInfo54")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo55")}</p>


                        </div>


                    )}

                    {activeSection === 'buyerGuide' && (
                        <div>
                            <h2 className={styles['faq-title']}>{t("helpBasicInfo56")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo57")}</p>
                        </div>
                    )}

                    {activeSection === 'merchantBackend' && (
                        <div>
                            <h2 className={styles['faq-title']}>{t("helpBasicInfo58")}</h2>
                            <p className={styles['faq-tip']}>{t("helpBasicInfo59")}</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default FAQ;