import React from 'react'
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from "next/image";


const { Header, Content, Footer } = Layout;


export default function Index() {
    const router = useRouter();

    const handleJump = (key: string) => {
        router.push(key)
    }
    const t = useTranslations('global');
    const locale = useLocale();

    const footerStyle = {
        backgroundColor: '#3F86FF',
        position: 'relative',
        marginTop: '-1px',
        textAlign: 'center',
        padding: '0',
        width: '100%',
        color: '#EEEEEE',
    };

    const wrapStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '363px',
        flexDirection: 'column',
        lineHeight: '363px',
        color: '#EEEEEE',
    };

    const row1Style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        color: '#EEEEEE',
    };

    const row2Style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        borderTop: '1px solid #EEEEEE',
        marginTop: '32px',
        color: '#EEEEEE',
    };

    const imageTextStyle = {
        position: 'absolute',
        // left: '325px',
        marginRight: '600px',
        top: '30px',
        width: '356px',
        fontFamily: 'PingFangSC, PingFang SC',
        fontWeight: '400',
        fontSize: '10px',
        color: '#EEEEEE',
        lineHeight: '14px',
        textAlign: 'center',
        fontStyle: 'normal',
        whiteSpace: 'nowrap',
    };

    // 注意：由于.image-text_41 和 .image-text_42 非常相似，我们可以考虑只创建一个通用样式
    const imageTextCommonStyle = {
        ...imageTextStyle, // 共享的样式
        color: '#EEEEEE',
        cursor: 'pointer',
    };

    const imageText41Style = {
        ...imageTextCommonStyle,
    };

    const imageText42Style = {
        ...imageTextCommonStyle,
        // left:'700px'
        marginLeft: '580px',
    };

    // 为悬停效果添加内联样式
    const imageText42HoverStyle = {
        color: '#EEEEEE',
    };

    const alinkStyle = {
        color: '#EEEEEE',
        cursor: 'pointer',
    };

    const alinkHoverStyle = {
        color: '#EEEEEE',
    };




    const colOneStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '265px',
    };

    const colTwoStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    };

    const colThreeStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    };

    const colFourStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: '54px',
        marginTop: '102px',
    };

    const textWrapper40Style = {
        height: '87px',
        marginTop: '48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const text_78Style = {
        height: '21px',
        overflowWrap: 'break-word',
        color: 'rgba(238, 238, 238, 1)',
        fontSize: '15px',
        fontFamily: 'PingFangSC-Medium',
        fontWeight: '300',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '21px',
    };

    const text_79Style = {
        height: '57px',
        overflowWrap: 'break-word',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Regular',
        fontWeight: 'normal',
        textAlign: 'left',
        lineHeight: '19px',
        marginTop: '9px',
        color: '#EEEEEE',
    };

    const textWrapper_38Style = {
        marginLeft: '55px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const text_73Style = {
        height: '21px',
        overflowWrap: 'break-word',
        color: 'rgba(238, 238, 238, 1)',
        fontSize: '15px',
        fontFamily: 'PingFangSC-Medium',
        fontWeight: '300',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '21px',
    };

    const text_74Style = {
        height: '27px',
        overflowWrap: 'break-word',
        color: '#EEEEEE',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Regular',
        fontWeight: 'normal',
        textAlign: 'left',
        lineHeight: '27px',
        marginTop: '19px',
        cursor: 'pointer',
    };

    const group_41Style = {
        height: '205px',
        marginLeft: '80px',
        display: 'flex',
        flexDirection: 'column',
    };

    const text_75Style = {
        width: '100px',
        height: '21px',
        overflowWrap: 'break-word',
        color: 'rgba(238, 238, 238, 1)',
        fontSize: '15px',
        fontFamily: 'PingFangSC-Medium',
        fontWeight: '500',
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '21px',
    };

    const textWrapper_39Style = {
        position: 'relative',
        marginTop: '17px',
        height: '30px',
        display: 'flex',
        flexDirection: 'row',
        overflowWrap: 'break-word',
        color: 'rgba(167, 167, 174, 1)',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Regular',
        textAlign: 'left',
        lineHeight: '30px',
    };

    const text_76Style = {
        height: '27px',
        overflowWrap: 'break-word',
        color: '#a7a7ae',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Regular',
        fontWeight: 'normal',
        textAlign: 'left',
        lineHeight: '27px',
        marginLeft: '33px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const text_77Style = {
        position: 'absolute',
        left: '0',
        top: '0',
        height: '27px',
        overflowWrap: 'break-word',
        color: 'rgba(167, 167, 174, 1)',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Regular',
        textAlign: 'left',
        lineHeight: '27px',
    };

    const imageText_39Style = {
        height: '98px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const imageText_40Style = {
        height: '98px',
        marginLeft: '27px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const textGroup_10Style = {
        height: '27px',
        overflowWrap: 'break-word',
        color: 'rgba(167, 167, 174, 1)',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium',
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: '27px',
    };

    const textGroup_11Style = {
        height: '27px',
        overflowWrap: 'break-word',
        color: 'rgba(167, 167, 174, 1)',
        fontSize: '12px',
        fontFamily: 'PingFangSC-Medium',
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: '27px',
    };

    const text_80Style = {
        width: '312px',
    };

    const font_Style = {
        color: '#EEEEEE',
    }

    const suffixStyle = {
        color: '#fff',
        opacity: 0.6,
    }

    return (
        <Footer style={{ ...footerStyle }}>
            <footer style={{ ...wrapStyle }}>
                <section style={{ ...row1Style }}>
                    <section style={{ ...colOneStyle }}>
                        <Image
                            loading="lazy"
                            src="/fotLogo.png"
                            alt="bincial"
                            width={80}
                            height={60}
                            style={{ borderRadius: 6 }}
                        />
                        <section style={{ ...textWrapper40Style }}>
                            <span style={{ ...text_78Style }}>{t("companyName")}</span>
                            <span style={{ ...text_79Style }}>
                                {t("companyIntroduce")}
                            </span>
                        </section>
                    </section>
                    <section style={{ ...colTwoStyle }}>
                        <section style={{ ...textWrapper_38Style }}>
                            <span style={{ ...text_73Style }}>{t("Quick entrance")}</span>
                            <span style={{ ...text_74Style }} onClick={() => handleJump('/home')}>{t("home page")}</span>
                            <span style={{ ...text_74Style }} onClick={() => handleJump('/products')}>{t("products and services")}</span>
                            <span style={{ ...text_74Style }} onClick={() => handleJump('/about')}>{t("about us")}</span>
                            <span style={{ ...text_74Style }} onClick={() => handleJump('/help')}>{t("help center")}</span>
                        </section>
                    </section>
                    <section style={{ ...colThreeStyle }}>
                        <section style={{ ...group_41Style }}>
                            <span style={{ ...text_75Style }}>{t("contactUs")}</span>
                            <section style={{ ...textWrapper_39Style }}>

                                <span style={{ ...font_Style }}>{t("Collab：")}</span>
                                <span style={{ ...suffixStyle }}>135-8566-0971</span>

                            </section>
                            <section style={{ ...textWrapper_39Style }}>
                                <span style={{ ...font_Style }}>{t("Support：")}</span>
                                <span style={{ ...suffixStyle }}>021-61673695</span>


                            </section>
                            <section style={{ ...textWrapper_39Style }}>
                                <span style={{ ...font_Style }}>{t("Link：")}</span>
                                <span style={{ ...suffixStyle }}>support@bincial.com</span>


                            </section>
                            <section style={{ ...textWrapper_39Style }}>
                                <span style={{ ...font_Style }}>{t("Addr：")}</span>
                                <span style={{ ...text_80Style, ...suffixStyle }}>{t("address")}</span>


                            </section>
                        </section>
                    </section>
                    <section style={{ ...colFourStyle }}>

                        <section style={{ ...imageText_39Style }}>
                            <Image
                                loading="lazy"
                                src="https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/b71350cf-10b5-4ac4-a3c6-669307f98378.png"
                                alt="bincial"
                                width={69}
                                height={69}
                            />
                            <span style={{ ...textGroup_10Style }}>{t("Download")}</span>
                        </section>
                        <section style={{ ...imageText_40Style }}>
                            <Image
                                loading="lazy"
                                src="https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/a8de1285-5db6-47e8-9fd7-0408835de24a.jpeg"
                                alt="bincial"
                                width={69}
                                height={69}
                            />
                            <span style={{ ...textGroup_11Style }}>{t("WeChat")}</span>
                        </section>
                    </section>
                </section>
                <section style={{ ...row2Style }}>
                    <section style={{ ...imageText41Style }} >
                        <a target='_blank' style={{ ...alinkStyle }} href='/en/policy'> {t("footerPolicy")}</a>｜  <a style={{ ...alinkStyle }} target='_blank' href="/en/user">  {t("footerAgreement")}</a>
                    </section>
                    <a style={{ ...imageText42Style }} target='_blank' href='https://beian.miit.gov.cn/#/Integrated/index'>
                        {t("footerCompany")}
                    </a>
                </section>
            </footer>
        </Footer>
    )
}
