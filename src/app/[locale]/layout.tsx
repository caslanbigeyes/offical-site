import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useMessages } from 'next-intl';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  getTranslations
} from 'next-intl/server';
import { ProgressBarProviders } from '@/app/providers/progress-bar-providers'
import { useRouter } from 'next/router';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'index' });
  return {
    // metadataBase: new URL('http://localhost:3000'),
    title: t('title'),
    description: 'Machine vision integrator, Bolt Threads inspection machine vision, thread inspection, vision inspection, metal surface inspection, sealant inspection, machined motor housing inspection, inspection vision, weld seam inspection machine vision, defect inspection on metal surfaces, 3D structured light, character inspection/OCR, robotic arm vision solution, machine vision system robot arm, 3D machine vision, industrial robotic arm machine vision, machine vision 3D coordinates, color difference machine vision, quality inspection machine vision, machine vision defect detection, machine vision sensor, machine vision in robotics, machine vision, machine vision camera, machine vision systems, machine vision cameras, machine vision system, vision machine, machine vision inspection, machine vision lighting, machine vision companies, machine vision lens, 3D machine vision, machine vision AI. machine vision, vision systems, vision software, machine vision camera, vision inspection system, machine vision system, system technology, vision inspection, machine vision inspection, machine vision lighting, machine vision software, vision system camera, visual inspection systems, camera inspection systems, inspection system, visual inspection machine, industrial vision, machine vision technology',
    openGraph: {
      title: t('title'),
      description: 'Machine vision integrator, Bolt Threads inspection machine vision, thread inspection, vision inspection, metal surface inspection, sealant inspection, machined motor housing inspection, inspection vision, weld seam inspection machine vision, defect inspection on metal surfaces, 3D structured light, character inspection/OCR, robotic arm vision solution, machine vision system robot arm, 3D machine vision, industrial robotic arm machine vision, machine vision 3D coordinates, color difference machine vision, quality inspection machine vision, machine vision defect detection, machine vision sensor, machine vision in robotics, machine vision, machine vision camera, machine vision systems, machine vision cameras, machine vision system, vision machine, machine vision inspection, machine vision lighting, machine vision companies, machine vision lens, 3D machine vision, machine vision AI. machine vision, vision systems, vision software, machine vision camera, vision inspection system, machine vision system, system technology, vision inspection, machine vision inspection, machine vision lighting, machine vision software, vision system camera, visual inspection systems, camera inspection systems, inspection system, visual inspection machine, industrial vision, machine vision technology',
      images: [
        {
          url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-05-24/8cc4b90c-1222-4394-b83a-d4cb1281e977.png',
          width: 111,
          height: 29,
          alt: 'bincial'
        },
      ],
    },
  };
}

export default function BasicLayout({ children, params: { locale } }: Readonly<Props>) {

  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
      </head>
      <body className={inter.className}>
        <ProgressBarProviders>
          {children}
        </ProgressBarProviders>
      </body>
    </html>
  );
}
