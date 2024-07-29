'use client'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { Tag, Button, Form, FormProps as AntdFormProps, Input, notification } from 'antd';
import { pathnames, usePathname } from '../../navigation';
import { concatApi } from '../../api';
import copy from 'copy-to-clipboard';


type FieldType = {
    contactAddress?: string;
    appealContent?: string;
};


export default function Index({ shopDetail }) {
    const locale = useLocale();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const t = useTranslations('global');
    const pathname = usePathname();

    const onFinish: AntdFormProps<FieldType>["onFinish"] = (values: any) => {
        const { contactAddress, appealContent } = values;
        if (!contactAddress || !appealContent) return;
        if (window.gtagNeo) {
            window.gtagNeo('event', 'conversion', { 'send_to': 'AW-16589036935/_t43CI6ekMIZEIe7ouY9' });
        }
        concatApi(contactAddress, appealContent).then(res => {
            if ((res as any).code === 200) {
                form.resetFields();
                notification.success({
                    message: `${t('success')}`,
                    placement: "top",
                });
            } else {
                notification.error({
                    message: `${t('error')}`,
                    placement: "top",
                });
            }
        })
        return
    }

    const wrapStyle = {
        width: '100%',
        height: shopDetail ? 'unset' : '572px',
        background: shopDetail ? '#F4F4F4' : '#fbfbfb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: shopDetail ? '50px' : '0px',
    };

    const titleStyle = {
        width: '100%',
        height: '50px',
        fontWeight: '600',
        fontSize: shopDetail ? '18px' : '36px',
        color: shopDetail ? '#3F86FF' : '#232D37',
        lineHeight: '50px',
        fontStyle: 'normal',
        textAlign: 'center',

    };

    const sendStyle = {
        height: '18px',
        fontFamily: 'PingFangSC, PingFang SC',
        fontWeight: '300',
        fontSize: '18px',
        color: '#333333',
        lineHeight: '18px',
        textAlign: 'center',
        fontStyle: 'normal',
        marginTop: '12px',
    };

    const contactTypeStyle = {
        width: '764px',
        // height: '232px',
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const contactInputStyle = {
        height: '40px',
        // border: shopDetail ? 'unset' : '1px solid #333333',
        borderRadius: '0',
    };

    const contactInputAreaStyle = {
        // border: shopDetail ? 'unset' : '1px solid #333333',
        borderRadius: '0',
    };

    const contactBtnStyle = {
        // border: shopDetail ? 'unset' : '1px solid #333333',
        borderRadius: '0',
        height: '40px',
        background: '#3F86FF',
        color: '#FFFFFF',
        width: '100%',
        border: 'none',
    };

    const leftStyle = {
        height: '100%',
        width: '333px',
    };

    const warnStyle = {
        fontFamily: 'PingFangSC, PingFang SC',
        fontWeight: '400',
        fontSize: '15px',
        color: '#333333',
        lineHeight: '18px',
        textAlign: 'center',
        fontStyle: 'normal',
    };

    const copyStyle = {
        flexWrap: 'nowrap',
        display: 'flex',
        marginTop: '6px',
    };

    const iptStyle = {
        width: '250px',
        textAlign: 'center',
        height: '17px',
        fontFamily: 'PingFangSC, PingFang SC',
        fontWeight: '400',
        fontSize: '12px',
        color: '#333333',
        lineHeight: '21px',
        fontStyle: 'normal',
        background: '#EEEEEE',
        height: '21px',
        paddingLeft: '3px',
    };

    const textStyle = {
        width: '42px',
        height: '21px',
        background: '#578B95',
        // textAlign 'center',
        color: '#fbfbfb',
        cursor: 'pointer',
    };

    const rightStyle = {
        width: '475px',
        // 嵌套的全局样式需要特殊处理，这里只转换了最外层的样式
    };

    const byLinkStyle = {
        width: '72px',
        height: '13px',
        fontFamily: 'PingFangSC, PingFang SC',
        fontWeight: '400',
        fontSize: '9px',
        color: '#333333',
        lineHeight: '13px',
        textAlign: 'left',
        fontStyle: 'normal',
        marginLeft: '78px',
        marginTop: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    const btnStyle = {
        opacity: '0.7',
        width: '100%',
        borderRadius: '0',
        background: '#333333',
        color: '#FFFFFF',
    };



    // 请注意，对于嵌套的 :global 样式，需要在 React 组件中使用特定的方法来覆盖。
    // 这些样式通常涉及到组件库的类名，可能需要结合使用 CSS 模块或其他方法来实现。

    const validateContact = (_: string, value: any) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // 示例：中国的手机号码正则  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 基本的邮箱地址正则
        if (phoneRegex.test(value)) {
            return Promise.resolve(); // 电话号码格式正确  
        }
        if (emailRegex.test(value)) {
            return Promise.resolve(); // 邮箱地址格式正确  
        }
        return Promise.reject(new Error('请输入有效的电话号码或邮箱地址')); // 格式不正确  
    };


    return (
        <section style={{ ...wrapStyle }}>
            <section style={{ ...titleStyle, marginTop: pathname === "/shop" || shopDetail ? '0px' : '100px' }}>{t('contact')}</section>
            <section style={{ ...sendStyle }}>
                {t('sendComEmail')}：support@bincial.com
            </section>
            <section style={{ ...contactTypeStyle }}>
                <section style={{ ...rightStyle }}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item name='contactAddress'
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator: (_, value) => {
                                        return validateContact('', value);
                                    },
                                    message: t('checkEmail')
                                }),
                            ]}
                        >
                            <Input style={{ ...contactInputStyle }} placeholder={t('telephone')} />
                        </Form.Item>
                        <Form.Item name='appealContent'>
                            <TextArea style={{ ...contactInputAreaStyle }}
                                autoSize={{ minRows: 5, maxRows: 5 }} // 设置最小3行，最大5行
                                rows={4} placeholder={t('ask')} maxLength={6} />
                        </Form.Item>
                        <Form.Item>
                            <button style={{ ...contactBtnStyle, borderRadius: '24px' }}  htmltype="submit">{t('submit')}</button>
                        </Form.Item>
                    </Form>
                </section>
            </section>
        </section>
    )
}