import React, { useState, useEffect } from 'react';
import styles from './index.module.less';
import { useLocale, useTranslations } from 'next-intl';
import useStore from '@/store';
import { LoadingOutlined } from '@ant-design/icons';
import { pathnames, usePathname } from '../../navigation';
import { useRouter } from 'next/navigation'
import { Spin, Input, Pagination } from 'antd';

import { queryCateGories, searchProductsInfo, addProductsInfo } from '@/api';
import Link from "next/link";


const MultiLevelMenu = () => {
  // const [firstLevelData, setFirstLevelData] = useState([]);
  // const [secondLevelData, setSecondLevelData] = useState([]);
  // const [thirdLevelData, setThirdLevelData] = useState([]);
  // const [selectedFirst, setSelectedFirst] = useState('');
  // const [selectedSecond, setSelectedSecond] = useState('');
  // const [selectedThird, setSelectedThird] = useState('')
  const pathname = usePathname();
  const setThirdCategory = useStore((state) => state.setThirdCategory);
  const setSecondCategory = useStore((state) => state.setSecondCategory);
  const setActiveCategory = useStore((state) => state.setActiveCategory);
  const setFirstCategory = useStore((state) => state.setFirstCategory);
  const setSelectedFirst = useStore((state) => state.setSelectedFirst);
  const setSelectedSecond = useStore((state) => state.setSelectedSecond);
  const setSelectedThird = useStore((state) => state.setSelectedThird);
  const setFirstLevelData = useStore((state) => state.setFirstLevelData);
  const setSecondLevelData = useStore((state) => state.setSecondLevelData);
  const setThirdLevelData = useStore((state) => state.setThirdLevelData);

  const { firstLevelData, secondLevelData, thirdLevelData,
    activeCode, selectedFirst, selectedSecond, selectedThird, categoryCache,
    FirstCategory,
    SecondCategory,
    ThirdCategory
  } = useStore();
  const [searchLoading, setSearchLoading] = useState(false);

  const router = useRouter();


  const t = useTranslations('global');
  const locale = useLocale();
  const isEn = locale === 'en'

  useEffect(() => {
    // 检查缓存中是否有第一层分类的数据
    if (firstLevelData.length) {
      setSelectedFirst(firstLevelData[0].code)
      setFirstCategory({
        FirstCode: firstLevelData[0].code,
        FirstName: isEn ? firstLevelData[0].nameEn : firstLevelData[0].name,
      })
      if (secondLevelData.length) {
        setSelectedSecond(secondLevelData[0].code)
        setSecondCategory({
          secondName: isEn ? secondLevelData[0].nameEn : secondLevelData[0].name,
          secondCode: secondLevelData[0].code,
        })
      }
      if (thirdLevelData.length) {
        setSelectedThird(thirdLevelData[0].code)
        setThirdCategory({
          thirdCode: thirdLevelData[0].code,
          thirdName: isEn ? thirdLevelData[0].nameEn : thirdLevelData[0].name,
        })
      }
    } else {
      setSearchLoading(true)
      queryCateGories({ code: null, type: 1, isRecommend: 0 }).then(res => {
        const { data, code } = res;
        if (code === 200) {
          setFirstLevelData([...data]);
          setSelectedFirst(data[0].code)
          setFirstCategory({
            FirstCode: data[0].code,
            FirstName: isEn ? data[0].nameEn : data[0].name,
          })
          setSearchLoading(false)
        }
        queryCateGories({ code: data[0].code, type: 2, isRecommend: 0 }).then(res => {
          const { data, code } = res;
          if (code === 200) {
            setSelectedSecond(data[0].code)
            setSecondLevelData(data)
            setSecondCategory({
              secondName: isEn ? data[0].nameEn : data[0].name,
              secondCode: data[0].code,
            })
          }
          queryCateGories({ code: data[0].code, type: 3, isRecommend: 0 }).then(res => {
            const { data, code } = res;
            if (code === 200) {
              setThirdLevelData(data)
              setSelectedThird(data[0].code)
              setThirdCategory({
                thirdCode: data[0].code,
                thirdName: isEn ? data[0].nameEn : data[0].name,
              })
            }
          });
        })
      }).finally(() => {
        setSearchLoading(false)
      })
    }

  }, []);

  const handleFirstHover = (item, type) => {
    if (type !== 'mouse') {
      handleJumpShop(item.code)

      setThirdLevelData([])
      setFirstCategory({
        FirstCode: item.code,
        FirstName: isEn ? item.nameEn : item.name,
      })
      setActiveCategory({
        activeCode: item.code,
        activeName: isEn ? item.nameEn : item.name,
      })
    }
    setSelectedFirst(item.code);

    if (type === "click") {
      setSecondCategory({
        secondCode: '',
        secondName: '',
      })
      setThirdCategory({
        thirdCode: '',
        thirdName: '',
      })
    }
    // 检查缓存中是否有第一层分类的数据
    if (categoryCache[item.code]) {
      setSecondLevelData(categoryCache[item.code]);
      handleSecondHover(categoryCache[item.code][0], 'first');
    } else {
      queryCateGories({ code: item.code, type: 2, isRecommend: 0 }).then(res => {
        const { data, code } = res;
        if (code === 200) {
          categoryCache[item.code] = data;
          setSecondLevelData(data)
          handleSecondHover(data[0], 'first');
        }
      });
    }
  };

  const handleSecondHover = (item, type) => {

    if (type !== 'mouse') {
      if (type !== 'first') {
        handleJumpShop(selectedFirst, item.code)
      }

      if (type !== 'first') {
        setSelectedSecond(item.code);
        setActiveCategory({
          activeCode: item.code,
          activeName: isEn ? item.nameEn : item.name,
        })
        setSecondCategory({
          secondCode: item.code,
          secondName: isEn ? item.nameEn : item.name,
        })
      }
    }

    if (categoryCache[item.code]) {
      setThirdLevelData(categoryCache[item.code]);
    } else {
      queryCateGories({ code: item.code, type: 3, isRecommend: 0 }).then(res => {
        const { data, code } = res;
        if (code === 200) {
          categoryCache[item.code] = data;
          setThirdLevelData(data)
          if (type === "click") {
            setThirdCategory({
              thirdCode: '',
              thirdName: '',
            })
          }
        }
      });
    }

  };

  const handleJumpShop = (first, second, third) => {
    // const url = `/category/${first ?? ''}${second ? `/${second}` : ''}${third ? `/${third}` : ''}`;
    // console.log(first, second, third, 4444);
    // router.push(url);
  }

  const handleThirdHover = (item, type) => {
    // // 直接选三级分类， 现检查有没有选中二级分类，没有的话默认第一个
    if (selectedSecond) {
      setSelectedSecond(secondLevelData[0].code);

      setSecondCategory({
        secondName: isEn ? secondLevelData[0].nameEn : secondLevelData[0].name,
        secondCode: secondLevelData[0].code,
      })
    }

    handleJumpShop(selectedFirst, selectedSecond, item.code)
    setSelectedThird(item.code);
    setThirdCategory({
      thirdCode: item.code,
      thirdName: isEn ? item.nameEn : item.name,
    })
    setActiveCategory({
      activeCode: item.code,
      activeName: isEn ? item.nameEn : item.name,
    })
  }

  return (
    <div className={styles['menu-container']}>
      {searchLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#3F86FF' }} spin />}></Spin>}

      <ul className={styles['first-level']}>
        {firstLevelData.map(item => (
          <Link key={item.id} className={styles.link} href={`/category/${isEn ? item.nameEn : item.name}`}>
            <li
              onMouseEnter={() => handleFirstHover(item, 'mouse')}
              onClick={() => handleFirstHover(item, 'click')}
              className={`${styles['menu-item']} ${selectedFirst === item.code ? styles['first-active'] : ''} ${activeCode.activeCode === item.code ? styles['first-checked'] : ''}`}
            >
              <a className={styles.link} target="_blank">
                {isEn ? item.nameEn : item.name}
              </a>

            </li>
          </Link>
        ))}
      </ul>
      {!!secondLevelData.length && (
        <ul className={styles['second-level']}>
          {secondLevelData.map(item => (
            <Link key={item.id} className={styles.link} href={`/category/${FirstCategory.FirstName}/${isEn ? item.nameEn : item.name}`}>
              <li

                onMouseEnter={() => handleSecondHover(item, 'mouse')}
                onClick={() => handleSecondHover(item, 'click')}
                className={`${styles['menu-item']}  ${selectedSecond === item.code ? styles['second-active'] : ''} ${activeCode.activeCode === item.code ? styles['second-checked'] : ''} `}
              >
                <a className={styles.link} target="_blank">
                  {isEn ? item.nameEn : item.name}
                </a>
              </li>
            </Link>
          ))}
        </ul>
      )}
      {selectedSecond && (
        <ul className={styles['third-level']}>
          {thirdLevelData.map(item => (
            <Link key={item.id} passHref className={styles.link} href={`/category/${FirstCategory.FirstName}/${SecondCategory.secondName}/${isEn ? item.nameEn : item.name}`}>
              <li
                onClick={() => handleThirdHover(item, 'click')}
                className={`${styles['menu-item']}  ${selectedThird === item.code ? styles['third-active'] : ''} ${activeCode.activeCode === item.code ? styles['second-checked'] : ''} `}>
                <a className={styles.link} target="_blank">
                  {isEn ? item.nameEn : item.name}
                </a>

              </li>
            </Link>
          ))}
        </ul>
      )
      }
    </div >
  );
};

export default MultiLevelMenu;