import React, { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { List, Button } from 'antd';

import styles from './index.module.less';
interface Video {
    id: number;
    title: string;
    time: string;
    watched: boolean;
    url: string;
}


const VideoList = () => {
    const t = useTranslations('global');
    const [videos, setVideos] = useState<Video[]>([
        {
            id: 1,
            title: `1.${t("discover")} `,
            time: '00:55',
            watched: false,
            url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/videos/common/dongTai.mp4',
        },
        {
            id: 2,
            title: `2.${t("productGuide")} `,
            time: '01:53',
            watched: false,
            url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/videos/common/shiYongZhiNan.mp4',
        },
        {
            id: 3,
            title: `3.${t("liveGuide")} `,
            time: '00:51',
            watched: false,
            url: 'https://website-1316858268.cos.ap-shanghai.myqcloud.com/videos/common/zhiBo.mp4',
        }
    ]);

    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);


    const handleVideoClick = (video: any) => {
        setCurrentVideo(video);
        // 在这里可以处理标记为已观看的逻辑  
        const updatedVideos = videos.map((v) => {
            return v.id === video?.id ? { ...v, watched: true } : v;
        })
        setVideos(updatedVideos);
        // 在这里可以处理视频播放逻辑，比如使用video元素或第三方库来播放视频  
    };

    useEffect(() => {
        if (videos.length > 0) {
            setCurrentVideo(videos[0]);
            const video = videos[0];
            const updatedVideos = videos.map((v) => {
                return v.id === video.id ? { ...v, watched: true } : v;
            })
            setVideos(updatedVideos);
        }
    }, [])


    return (
        <div className={styles['wrapVideo']}>
            <video muted autoPlay style={{ width: '652px', height: '367px', borderRadius: "8px" }} src={currentVideo?.url} controls></video>
            <div className={styles['catalogue']}>
                <div className={styles['cat-title']}>{t('Catalogue')}</div>
                <List
                    style={{ height: '317px' }}
                    dataSource={videos}
                    renderItem={(video) => (
                        <List.Item
                            style={{ width: '362px', height: '53px', cursor: 'pointer' }}
                            onClick={() => handleVideoClick(video)}
                            actions={[
                                <Button
                                    key="myBtn"
                                    style={{ color: '#333333', opacity: video.watched ? '0.5' : 1 }}
                                    type="link"
                                    disabled={video.watched}
                                    onClick={() => {
                                        // 在这里可以处理标记为已观看的逻辑  
                                        const updatedVideos = videos.map((v) => {
                                            return v.id === video.id ? { ...v, watched: true } : v;
                                        })
                                        setVideos(updatedVideos);
                                    }}
                                >
                                    {video.watched ? `${t("Watched")}` : `${t("Not Watched")}`}
                                </Button>
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <>
                                        <span className={styles['cat-name']}>{`${video.title} `}</span>
                                        <span className={styles['cat-time']}> {`${video.time}`}</span>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>

        </div >
    );
};

export default VideoList;