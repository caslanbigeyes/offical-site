import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, pathnames, usePathname } from '../../navigation';

const GetNavList = (t: any) => {
  const locale = useLocale();
  const pathname = usePathname();
    const otherLocale: any = locale === 'en' ? ['zh', 'CN'] : ['en', 'EN'];
    return [
        {
            name:'home',
            key: '/home',
            label: t("home page"),
        },
        {
            name:'products',
            key: '/products',
            label: t("products and services")
        },

        {
            name:'about',
            key: '/about',
            label: t("about us")
        },
        {
            name:'help',
            key: '/help',
            label: t("help center")
        },
    ]
}

export default GetNavList