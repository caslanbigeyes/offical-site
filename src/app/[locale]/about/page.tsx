'use client'
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, notification, Anchor } from 'antd';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Image from "next/image";
import { usePathname } from '../../../navigation';
import { joinApi } from '../../../api';
import axios from 'axios';
import styles from './index.module.less';
import dynamic from 'next/dynamic';


const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const UserGroup = dynamic(() => import('@/components/UserGroup'), { ssr: false });

interface MyAxiosResponse<T = any, R = any> {
  code?: number; // 注意这里使用了可选属性（?），因为不是所有的 Axios 响应都会包含 code  
  data?: any;
  status?: any;
  msg?: any;
}

interface FormData {
  name: string;
  phone: string;
  applyPosition: string;
  fileUrl: string;
}


export default function About() {
  const t = useTranslations('global');
  const locale = useLocale();
  const isEn = locale === 'en'
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('section1');
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef(null);
  const [form] = Form.useForm();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [fileUrl, setResume] = useState(null); // 假设resume是一个File对象 


  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    applyPosition: '',
    fileUrl: '', // 或者你可以使用空字符串 '' 如果resume是一个文件名的字符串  
  });
  const useLists = [{
    url: '/curture1.png',
    name: t("MISSION"),
    des1: t("cardOneDes1"),

  },
  {
    url: '/curture2.png',
    name: t("VISION"),
    des1: t("cardOneDes2"),

  },
  {
    url: '/curture3.png',
    name: t("Biz Philosophy"),
    des1: t("cardOneDes3"),

  },
  {
    url: '/curture4.png',
    name: t("Team Culture"),
    des1: t("cardOneDes4"),

  }
  ]

  const joinUsList = [
    { name: t("FLEXIBILITY"), url: '/joinUs1.png' },
    { name: t("BONUS"), url: '/joinUs2.png' },
    { name: t("TRAINING"), url: '/joinUs3.png' },
    { name: t("PROMOTION"), url: '/joinUs4.png' }
  ]

  const scrollToSection = (event: React.MouseEvent<HTMLElement>, sectionActive: string) => {
    event.preventDefault();
    // 使用类型断言来告诉 TypeScript event.target 是一个 HTMLElement  
    const targetElement = event.target as HTMLElement;
    if ('href' in targetElement) {
      const href = targetElement.getAttribute('href');
      if (href !== null) {
        const section = document.querySelector(href);
        setActiveSection(sectionActive); // 更新选中的锚点
        const fixedHeaderHeight = 60; // 假设这是顶部固定元素的高度  
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          // 获取目标元素相对于视口顶部的位置  
          const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
          // 计算新的滚动位置，确保目标元素不被固定头部遮挡  
          const newScrollPosition = Math.max(0, sectionTop - fixedHeaderHeight);
          window.scrollTo({
            top: newScrollPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // 处理文件选择  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      // 添加文件到 formData 对象
      formData.append('file', event.target.files![0]);
      axios.post('https://xiaoluo-dev.xiaoluoapp.com/file/cosUpload', formData).then((res: MyAxiosResponse) => {
        if (res.data.code === 200) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            fileUrl: res.data.pathUrl, // 获取文件对象  
          }));
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
    }
  };


  // 处理表单提交  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止表单的默认提交行为（如果你需要自定义提交逻辑）  
    joinApi({ ...formData }).then((res: MyAxiosResponse) => {
      if (res.code === 200) {
        notification.success({
          message: `${res.msg}`,
          placement: "top",
        });
        // 清空表单     
        setFormData({
          name: '',
          phone: '',
          fileUrl: '',
          applyPosition: "",

        } as FormData)
      } else {
        notification.error({
          message: `${res.msg}`,
          placement: "top",
        });
      }
    })
  };

  useEffect(() => {
    const handleScroll = () => {
      // 获取元素  
      const screen = document.getElementById('screen');
      const stickyNav = document.getElementById('sticky-nav');
      if (stickyNav) {
        if (navRef && navRef.current) {

          const scrollPosition = window.pageYOffset;
          const navTopPosition = navRef.current.offsetTop;
          if (scrollPosition >= navTopPosition) {
            setIsSticky(true);
            if (stickyNav.parentNode) {
              stickyNav.parentNode.removeChild(stickyNav);
            }
            document.body.appendChild(stickyNav);
            stickyNav?.classList.remove('hidden');
            // 动态的插入到body下
          } else {
            setIsSticky(false);
            // document.main.removeChild(stickyNav);
            // stickyNav?.classList.add('hidden');
            if (imageRef.current) {
              const designDraftWidth = 1920;//设计稿的宽度
              const designDraftHeight = 960;//设计稿的高度
              //根据屏幕的变化适配的比例
              const scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designDraftWidth / designDraftHeight ?
                (document.documentElement.clientWidth / designDraftWidth) :
                (document.documentElement.clientHeight / designDraftHeight);
              const realHeight = window.getComputedStyle(imageRef.current).height
              const heightInPixels = parseInt(realHeight.replace('px', ''), 10);
              const scaledHeight = heightInPixels * scale;
              navRef.current.style.top = scaledHeight + 'px';
            }
          }
        }
      }
    };

    // window.addEventListener('scroll', handleScroll);

    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
  }, []);

  return (
    <Layout curActive='/about'>
      <main>
        <Image
          ref={imageRef}
          src="/aboutBg.png"
          alt="bincial"
          width={1920}
          height={766}
          style={{ borderRadius: 6, width: '100%' }}
          priority
          id='img-wrap'
        />


        <div className={`${styles['anchor-container']}  ${isSticky ? styles['sticky'] : ''}`} id="sticky-nav" ref={navRef}  >
          <a href="#section1"
            className={`${styles['anchor-link']} ${activeSection === 'section1' ? styles['active'] : ''}`}
            onClick={(event) => scrollToSection(event, 'section1')}
          >{t("CULTURE")}</a>
          <a href="#section2"
            className={`${styles['anchor-link']} ${activeSection === 'section2' ? styles['active'] : ''}`}
            onClick={(event) => scrollToSection(event, 'section2')}
          >{t("BACKGROUND")}</a>
          <a href="#section3"
            className={`${styles['anchor-link']} ${activeSection === 'section3' ? styles['active'] : ''}`}
            onClick={(event) => scrollToSection(event, 'section3')}
          >{t("TALENT")}</a>
          <a href="#section4"
            className={`${styles['anchor-link']} ${activeSection === 'section4' ? styles['active'] : ''}`}
            onClick={(event) => scrollToSection(event, 'section4')}
          >{t("FOUNDING TEAM")}</a>
          <a href="#section5"
            className={`${styles['anchor-link']} ${activeSection === 'section5' ? styles['active'] : ''}`}
            onClick={(event) => scrollToSection(event, 'section5')}
          >{t("JOIN US")}</a>

        </div >

        <div className={styles["section1"]} id="section1">
          <div className={styles["title"]}>{t("CULTURE")}</div>
          <div className={styles['dec']}>{t("aboutDes1")}</div>
          <div className={styles.userList}>

            {useLists.map(i => (
              <div className={styles.wrapRow} key={i.url}>
                <div className={styles.top}>
                  <Image
                    src={i.url}
                    alt="bincial"
                    width={242}
                    height={205}
                    priority
                    style={{ borderRadius: 6 }}
                  />
                </div>
                <div className={styles.bottom}>
                  <div className={styles.bottomName}>
                    {i.name}
                  </div>
                  <div className={styles.des} style={{ lineHeight: isEn ? 'none' : '75px' }}>
                    {i.des1}
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>

        <div className={styles["section2"]} id="section2">
          <div className={styles["title"]}>{t("BACKGROUND")}</div>
          <div className={styles['dec']}>{t("aboutDes2")}</div>

          <div className={styles['photoText']}>
            <div className={styles['photo']}>
              <Image
                src='/businessBg.png'
                alt="bincial"
                width={505}
                height={317}
                priority
                style={{ borderRadius: 6 }}
              />
            </div>
            <div className={styles['section2Text']}>
              <div className={styles['des1']} style={{ whiteSpace: isEn ? "break-spaces" : 'nowrap' }}>
                {t("aboutProduceCompany")}
              </div>
              <div className={styles['des2']} style={{ marginTop: isEn ? "45px" : '25px' }}>
                {t("aboutBy")}
              </div>
              <div className={styles['dot']}>
                {t("aboutBy1")}
              </div>
              <div className={styles['dot']}>
                {t("aboutDes2")}
              </div>
              <div className={styles['dot']}>
                {t("aboutDes3")}
              </div>
            </div>
          </div>

        </div>

        <div className={styles["section1"]} id="section3">
          <div className={styles["title"]}>{t("TALENT")}</div>
          <div className={styles['dec']}>{t("aboutDes3")}</div>

          <div className={styles['photoText']}>
            <div className={`${styles['photo']} ${styles['right']} `}>
              <Image
                src='/talent.png'
                alt="bincial"
                width={505}
                height={317}
                priority
                style={{ borderRadius: 6 }}
              />
            </div>
            <div className={`${styles['section2Text']} ${styles['left']} `}>
              <div className={styles['des1']} style={{ lineHeight: isEn ? "32px" : "38px" }}>
                {t("aboutTalentDes1")}
              </div>
              <div className={styles['leftdes2']} style={{ lineHeight: isEn ? "32px" : "38px" }}>
                {t("aboutTalentDes2")}
              </div>

            </div>
          </div>
        </div>

        <div className={styles["section2"]} id="section4">
          <div className={styles["title"]}>{t("FOUNDING TEAM")}</div>
          <div className={styles['dec']}>{t("aboutDes4")}</div>
          <div className={styles['photoText']}>
            <div className={styles['photo']}>
              <Image
                src='/team.png'
                alt="bincial"
                width={505}
                height={317}
                priority
                style={{ borderRadius: 6 }}
              />
            </div>
            <div className={`${styles['section2Text']} ${styles['leftTeam']} `}>
              <div style={{ marginTop: isEn ? '0px' : '37px', lineHeight: isEn ? "20px" : "38px" }} className={`${styles['des1']} ${styles['teamProduce']} `}>
                {t("aboutTeamDes1")}
              </div>
              <div style={{ marginTop: isEn ? '36px' : '24px', lineHeight: isEn ? "20px" : "38px" }} className={`${styles['des2']} ${styles['wordBreak']}`}>
                {t("aboutTeamDes2")}
              </div>
              <div style={{ marginTop: isEn ? '0px' : '24px', lineHeight: isEn ? "20px" : "38px" }} className={`${styles['des2']} ${styles['wordBreak']}`}>
                {t("aboutTeamDes3")}
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles["section1"]} ${styles["wrapJoin"]}`} id="section5">
          <div className={styles["title"]}>{t("JOIN US")}</div>
          <div className={styles['dec']}>{t("aboutDes5")}</div>


          <div className={`${styles.userList} ${styles.wrapper}`}>

            {joinUsList.map(i => (
              <div className={`${styles.wrapRow}`} key={i.url}>
                <div className={styles.top}>
                  <Image
                    src={i.url}
                    alt="bincial"
                    width={122}
                    height={122}
                    priority
                    style={{ borderRadius: 6 }}
                  />
                </div>
                <div className={`${styles.bottom} ${styles.bottomWrap}`}>
                  <div className={`${styles.bottomName} ${styles.bottomJoinName}`}>
                    {i.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles['apply']}>
            <form onSubmit={handleFormSubmit} id="applicationForm" action="/submit_form" method="post" encType="multipart/form-data">
              <div className={styles['form-group']}>
                <label className={`${styles["label"]} ${styles["name-prefix"]}`} htmlFor="name">    {t("Name")}</label>
                <input value={formData.name} onChange={handleInputChange} type="text" id="name" name="name" className={styles["input-field"]} required />
              </div>
              <div className={styles['form-group']}>
                <label className={`${styles["label"]} ${styles["name-prefix"]}`} htmlFor="phone">    {t("Phone")}</label>
                <input value={formData.phone} onChange={handleInputChange} type="tel" id="phone" name="phone" className={styles["input-field"]} required />
              </div>
              <div className={styles['form-group']}>
                <label className={styles["label"]} htmlFor="applyPosition">    {t("Poaition")}</label>
                <input value={formData.applyPosition} onChange={handleInputChange} type="text" id="applyPosition" name="applyPosition" className={styles["input-field"]} />
              </div>
              <div className={styles['form-group']}>
                <div className={styles["file-upload-wrapper"]}>
                  <button className={`${styles["file-upload-btn"]} ${styles["name-prefix"]}`} type="button">    {t("Upload CV")}</button>
                  <input onChange={handleFileChange} type="file" id="fileUrl" name="fileUrl" className={styles["input-field"]} required />
                </div>
              </div>
              <div className={styles['form-apply']}>
                <button className={styles['form-btn']} type="submit">{t("APPLY NOW")}</button>
              </div>
            </form>

          </div>
        </div>
        <Footer />
      </main >
    </Layout >
  );
}
