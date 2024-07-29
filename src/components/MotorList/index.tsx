import React, { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import MotorCard from './MotorCard'; // 引入MotorCard组件  
import styles from './index.module.less'; // 引入LESS样式文件  
import { getDetailRecommend } from '@/api';


const MotorList = ({ id, type }) => {
  const [recommendList, setRecommendList] = useState([])
  const [popularList, setPopularList] = useState([])
  // 模拟数据  
  const mockMotors = [
    { model: 'SC516C', title: 'Motor 1', spec: 'Spec 1', price: 'US$340' },
    { model: 'SC517C', title: 'Motor 2', spec: 'Spec 2', price: 'US$350' },
    { model: 'SC518C', title: 'Motor 3', spec: 'Spec 3', price: 'US$360' },
    // 更多电机...  
  ];

  const t = useTranslations('global');
  const locale = useLocale();
  const isEn = locale === 'en'
  const pageSize = type === "company" ? 8 : 3

  useEffect(() => {
    getDetailRecommend({
      "formEventId": id,
      "page": 1,
      "limit": 3,
      "popularLimit": 0
    }, locale).then(res => {
      setRecommendList(res.page.list)
    })
    // 热门推荐
    getDetailRecommend({
      "formEventId": id,
      "page": 1,
      "limit": pageSize,
      "popularLimit": 4
    }, locale).then(res => {
      setPopularList(res.page.list)
    })
  }, [])



  // Calculate the number of placeholders needed
  const placeholdersCount = (3 - (popularList.length % 3)) % 3;
  const placeholders = Array.from({ length: placeholdersCount }).map((motor, index) => (
    <div key={Math.random()} className={styles.motorItem} style={{ width: 'calc(25% - 20px)' }}>
      <MotorCard motor={motor} />
    </div>
  ));

  const placeholders2 = Array.from({ length: placeholdersCount }).map((motor, index) => (
    <div key={Math.random()} className={styles.motorItem} style={{ width: 'calc(25% - 20px)' }}>
    <MotorCard motor={motor} />
  </div>
  ))



  if (type === "company") {
    return (
      <div className={styles.motorList} >
        {
          popularList.map(motor => (
            <div key={motor.model} className={styles.motorItem} style={{ width: 'calc(25% - 20px)' }}>
              <MotorCard motor={motor} />
            </div>
          ))
        }
        
        {
          <placeholders />
        }
      </div >
    )
  }





  return (
    <>
      {recommendList.length ? <h2 className={styles.motorListTitle}>Other recommendations for your business</h2> : null}
      <div className={styles.motorList}>
        {recommendList.map(motor => (
          <div key={motor.id} className={styles.motorItem}>
            <MotorCard motor={motor} />
          </div>
        ))}
        {
          placeholders.map(motor => (
            <div key={motor.id} className={styles.motorItem} style={{ opacity: 0 }}>
              <MotorCard motor={motor} />
            </div>
          ))}
      </div>

      {popularList.length ? <h2 className={styles.motorListTitle}>Supplier popular products </h2> : null}
      <div className={styles.motorList} >
        {
          popularList.map(motor => (
            <div key={motor.id} className={styles.motorItem}>
              <MotorCard motor={motor} />
            </div>
          ))
        }
        {
          placeholders.map(motor => (
            <div key={motor.id} className={styles.motorItem} style={{ opacity: 0 }}>
              <MotorCard motor={motor} />
            </div>
          ))}
      </div >
    </>
  );
};

export default MotorList;