// NavigationComponent.jsx
import React, { memo } from 'react';
import styles from './index.module.less'

const NavigationComponent = ({ navList, activeIndex, handleClick }) => {
    return (
        <section className={styles['nav']}>
            <section className={styles['navWrapper']}>
                {
                    navList.map((i, index) => {
                        return (
                            <section
                                key={index}
                                onClick={() => handleClick(i, index)}
                                className={`${styles['nav-item']} ${activeIndex === index ? styles['active'] : ''} `}
                            >
                                {i.nameEn}
                            </section>
                        )
                    })}
            </section>
        </section>
    );
};

export default memo(NavigationComponent);