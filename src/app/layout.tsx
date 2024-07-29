"use client"
import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { isDev } from '@/utils'
type Props = {
  children: ReactNode;
};


import React, { useState } from 'react';
import { useServerInsertedHTML, usePathname } from 'next/navigation';
import {
  createCache,
  extractStyle,
  StyleProvider
} from '@ant-design/cssinjs'

export const AntdProvider: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script dangerouslySetInnerHTML={{
        __html: `</script>${extractStyle(cache)}<script>`
      }} />
    )
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}



export default function RootLayout({ children }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/home') {
      console.log(pathname, 'pathname')
      const measurementId = 'G-YEMJP7GGPM'; // 替换为你的 GA4 衡量 ID

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.body.appendChild(script);

      const gtagScript = document.createElement('script');
      gtagScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          'send_page_view': true,
          'transport_type': 'beacon',
        });
      `;
      document.body.appendChild(gtagScript);


      // Google Ads 16542212926
      const adsMeasurementId = 'AW-16542212926'; // 替换为你的 Google Ads 测量 ID
      const adsScript = document.createElement('script');
      adsScript.async = true;
      adsScript.src = `https://www.googletagmanager.com/gtag/js?id=${adsMeasurementId}`;
      document.body.appendChild(adsScript);

      const adsGtagScript = document.createElement('script');
      adsGtagScript.innerHTML = `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${adsMeasurementId}');
         `;
      document.body.appendChild(adsGtagScript);




      // Google Ads 16589036935
      const NeoAdsMeasurementId = 'AW-16589036935'; // 替换为你的 Google Ads 测量 ID
      const adsNeoScript = document.createElement('script');
      adsNeoScript.async = true;
      adsNeoScript.src = `https://www.googletagmanager.com/gtag/js?id=${NeoAdsMeasurementId}`;
      document.body.appendChild(adsNeoScript);

      const adsNeoGtagScript = document.createElement('script');
      adsNeoGtagScript.innerHTML = `
               window.dataLayer = window.dataLayer || [];
               function gtagNeo(){dataLayer.push(arguments);}
               gtagNeo('js', new Date());
               gtagNeo('config', '${NeoAdsMeasurementId}');
             `;
      document.body.appendChild(adsNeoGtagScript);
    }

  }, []);

  return (
    <>
      {/* // 这边加link及相关标签不生效的 */}
      <AntdProvider>
        {children}
      </AntdProvider>
    </>

  )
}

