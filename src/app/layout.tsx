"use client"
import React, { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  useEffect(() => {
    const measurementId = 'G-S0T16HCKN9'; // 替换为你的 GA4 衡量 ID

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
        'linker': {
          'domains': ['http://offical-site-one.vercel.app/']
        }
      });
    `;
    document.body.appendChild(gtagScript);
  }, []);
  return children;
}