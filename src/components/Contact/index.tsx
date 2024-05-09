import React from 'react'
import { useLocale, useTranslations } from 'next-intl';
import { Tag, Button, Form, FormProps as AntdFormProps, Input, notification } from 'antd';
import Image from "next/image";
import { concatApi } from '../../api';
import copy from 'copy-to-clipboard';
import styles from './index.module.less';


type FieldType = {
    contactAddress?: string;
    appealContent?: string;
};


export default function Index() {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const t = useTranslations('global');

    const handleClick = () => {
        copy('www.bincial.com/jojo')
    }

    const onFinish: AntdFormProps<FieldType>["onFinish"] = (values: any) => {
        const { contactAddress, appealContent } = values;
        if (!contactAddress || !appealContent) return;
        concatApi(contactAddress, appealContent).then(res => {
            if (res.data.code === 200) {
                form.resetFields();
                notification.success({
                    message: `${res.data.msg}`,
                    placement: "top",
                });
            } else {
                notification.error({
                    message: `${res.data.msg}`,
                    placement: "top",
                });
            }
        })
        return

    }

    return (
        <div className={styles.wrap}>
            <div className={styles.title}>{t('contact')}</div>
            <div className={styles.send}>
                {t('sendEmail')}
            </div>
            <div className={styles.contactType}>
                <div className={styles.right}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600, marginLeft: '58px' }}
                    >
                        <Form.Item name='contactAddress' className={styles.changeBorder}>
                            <Input placeholder={t('telephone')} />
                        </Form.Item>
                        <Form.Item name='appealContent'>
                            <TextArea autoSize={{ minRows: 5, maxRows: 5 }} // 设置最小3行，最大5行
                                rows={4} placeholder={t('ask')} maxLength={6} />
                        </Form.Item>
                        <Form.Item>
                            <Button className={styles.btn} htmlType="submit">{t('submit')}</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}