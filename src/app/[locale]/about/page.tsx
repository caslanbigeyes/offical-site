'use client'
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, notification, Anchor, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Image from "next/image";
import { usePathname } from '../../../navigation';
import { joinApi } from '../../../api';
import axios from 'axios';
import styles from './index.module.less';
import dynamic from 'next/dynamic';
import withSuspense from '@/hoc';


const Footer = withSuspense(dynamic(() => import('@/components/Footer'), { ssr: true }));
const UserGroup = withSuspense(dynamic(() => import('@/components/UserGroup'), { ssr: true }));

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
  const [applyVisible, setApplyVisible] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);

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
    des2: '',
  },
  {
    url: '/curture2.png',
    name: t("VISION"),
    des1: t("cardOneDes2"),
    des2: t("cardOneDes2Y"),

  },
  {
    url: '/curture3.png',
    name: t("Biz Philosophy"),
    des1: t("cardOneDes3"),
    des2: t("cardOneDes3Y"),

  },
  {
    url: '/curture4.png',
    name: t("Team Culture"),
    des1: t("cardOneDes4"),
    des2: t("cardOneDes4Y"),

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

  const handleApply = () => {
    setApplyVisible(!applyVisible)
  }

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
      const file = event.target.files[0];
      if (file && file.size > 20 * 1024 * 1024) { // 20MB in bytes  
        alert(t('File size exceeds 20MB limit'));
        event.target.value = ''; // 清除输入值，以便用户可以选择其他文件  
        return;
      }
      const formData = new FormData();
      // 添加文件到 formData 对象
      formData.append('file', event.target.files![0]);
      axios.post('https://xiaoluo.xiaoluoapp.com/file/cosUpload', formData).then((res: MyAxiosResponse) => {
        if (res.data.code === 200) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            fileUrl: res.data.pathUrl, // 获取文件对象  
          }));
          setUploadStatus(true);
        } else {
          setUploadStatus(false);
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
        setApplyVisible(false)
        setUploadStatus(false)
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
            // document.body.appendChild(stickyNav);
            // stickyNav?.classList.remove('hidden');
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


  // 定义一个用于控制显示与隐藏的类名  
  const displayClass = applyVisible ? styles['visible'] : styles['hidden'];

  return (
    <Layout curActive='/about'>
      <main>
        <div className={styles['imageContainer']}>
          <Image
            ref={imageRef}
            src="https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/fb38c075-d13b-42a8-9441-24e8e38f1fbf.png"
            alt="bincial"
            width={1920}
            height={766}
            style={{ width: '100%' }}
            id='img-wrap'
            priority
            layout="responsive"
            className={styles.responsiveImage}
          />
        </div>

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
                    style={{ borderRadius: 6 }}
                  />
                </div>
                <div className={styles.bottom}>
                  <div className={styles.bottomName}>
                    {i.name}
                  </div>
                  {isEn ? <div className={styles.des} style={{}}>
                    {i.des1}
                  </div> : <div className={styles.des} style={{}}>
                    {i.des1}<div>{i.des2}</div>
                  </div>}
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
                src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/5414a064-5937-4369-9710-0c7d4e731843.png'
                alt="bincial"
                width={505}
                height={317}
                priority
                style={{ borderRadius: 6 }}
              />
            </div>
            <div className={styles['section2Text']} style={{ marginTop: isEn ? '41px' : '121px' }}>
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
                src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/8ed1eb9f-1f9c-4b39-a5fc-5edc63a02f51.png'
                alt="bincial"
                width={505}
                height={317}
                priority
                style={{ borderRadius: 6 }}
              />
            </div>
            <div style={{ marginTop: isEn ? '11px' : '161px' }} className={`${styles['section2Text']} ${styles['left']}`}>
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
                src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/24521492-b485-4d37-8c1b-ce993c3aeb9c.png'
                alt="bincial"
                width={505}
                height={317}
                priority
                style={{ borderRadius: 6 }}
              />
            </div>
            <div className={`${styles['section2Text']} ${styles['leftTeam']} `}>
              <div style={{ marginTop: isEn ? '0px' : '19px', lineHeight: isEn ? "20px" : "38px" }} className={`${styles['des1']} ${styles['teamProduce']} `}>
                {t("aboutTeamDes1")}
              </div>
              <div style={{ marginTop: isEn ? '36px' : '24px', lineHeight: isEn ? "20px" : "38px" }} className={`${styles['des2']} ${styles['wordBreak']}`}>
                {t("aboutTeamDes2")}
              </div>
              <div style={{ marginTop: isEn ? '0px' : '-11px', lineHeight: isEn ? "20px" : "38px" }} className={`${styles['des2']} ${styles['wordBreak']}`}>
                {t("aboutTeamDes3")}
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles["section1"]} ${styles["wrapJoin"]}`} id="section5" style={{ position: 'relative' }}>
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




          <div className={`${styles['apply']} ${displayClass}`}>
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
                <label className={`${styles["label"]} ${styles["name-prefix"]} `} htmlFor="applyPosition" >    {t("Poaition")}</label>
                <input value={formData.applyPosition} onChange={handleInputChange} type="text" id="applyPosition" name="applyPosition" className={styles["input-field"]} required />
              </div>
              <div className={styles['form-group']}>
                {uploadStatus ? <div className={styles["file-upload-wrapper"]}>
                  <Image
                    style={{ position: 'absolute', left: isEn ? '235px' : '255px' }}
                    src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/7146cb73-d567-438d-866c-96c09d0ae731.png'
                    alt="bincial"
                    width={18}
                    height={18}
                    priority
                  /><span style={{ color: '#3F86FF' }}>{t('uploadStatus')}</span>
                </div>
                  : <div className={styles["file-upload-wrapper"]}>
                    <Image
                      style={{ position: 'absolute', left: '255px' }}
                      src='https://website-1316858268.cos.ap-shanghai.myqcloud.com/files/2024-06-07/e5744dac-d174-4498-acfc-bb6f46ee6506.png'
                      alt="bincial"
                      width={18}
                      height={18}
                      priority
                    /><button className={`${styles["file-upload-btn"]} ${styles["name-prefix"]}`} type="button">    {t("Upload CV")}</button>
                    <input onChange={handleFileChange} type="file" id="fileUrl" name="fileUrl" className={styles["input-field"]} required />
                  </div>}
              </div>
              <div className={styles['form-apply']} style={{ marginTop: !applyVisible ? '-20px' : '32px' }}>
                <button className={styles['form-btn']} type="submit">{t("APPLY NOW")}</button>
              </div>
            </form>
          </div>
          <div className={styles['form-apply']} style={{ display: !applyVisible ? 'flex' : 'none', marginTop: !applyVisible ? '-20px' : '32px' }}>
            <button onClick={handleApply} className={styles['form-btn']} >{uploadStatus ? t("APPLYSUCESS") : t("APPLY NOW")}</button>
          </div>
        </div>
        <Footer />
      </main >
    </Layout >
  );
}
