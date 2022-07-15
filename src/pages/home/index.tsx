import { useEffect, useState } from 'react';
import VideoCard from '../../components/VideoCard';
import { getVideoCardInfo } from '../../webApi';
import styled from 'styled-components';

export default function HomePage() {
  const [videoInfo, setVideoInfo] = useState<any>('');

  useEffect(() => {
    getVideoCardInfo().then((data: any) => {
      setVideoInfo(data);
      return data;
    });
  }, []);

  const Wrapper = styled.div`
    max-width: 1440px;
    padding: 20px 0px;
    margin: 20px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  `;

  function handleVideoCardRender(info: any) {
    if (info) {
      return info?.map((item: any) => {
        return (
          <VideoCard
            key={item._id}
            videoCover={item.coverURL}
            videoTitle={item.title}
            userAvatar={item.user.username[0]}
            userName={item.user.username}
            createTime={item.createAt}
          />
        );
      });
    }
  }
  return <Wrapper>{handleVideoCardRender(videoInfo)}</Wrapper>;
}
