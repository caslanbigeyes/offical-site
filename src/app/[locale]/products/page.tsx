'use client'
import { Empty, Button } from 'antd';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Image from "next/image";
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const UserGroup = dynamic(() => import('@/components/UserGroup'), { ssr: false });
const IndustorySolutions = dynamic(() => import('@/components/IndustorySolutions'), { ssr: false });


export default function Order() {
  const router = useRouter();
  return (
    <Layout curActive='/products'>
      <main>
        <Image
          src="/proBanner.png"
          alt="bincial"
          width={1920}
          height={766}
          style={{ borderRadius: 6, width: '100%' }}
          priority
        />

        <IndustorySolutions />
        <UserGroup />
        <Footer />
      </main>
    </Layout>

  );
}
