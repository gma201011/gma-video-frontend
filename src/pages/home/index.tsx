import { useEffect, useState } from 'react';
import VideoCard from '../../components/VideoCard';
import { getVideoCardInfo } from '../../webApi';
import { NoStyleLink } from '../../components/StyleLink/NoStyleLink';
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
    display: flex;
    margin-bottom: 50px;
    flex-wrap: wrap;
    justify-content: space-around;
  `;

  function handleVideoCardRender(info: any) {
    if (info) {
      return info?.map((item: any) => {
        return (
          <NoStyleLink to={`/video/${item._id}`}>
            <VideoCard
              key={item._id}
              videoCover={item.coverURL}
              videoTitle={item.title}
              userAvatar={item.user.username[0]}
              userName={item.user.username}
              createTime={item.createAt}
            />
          </NoStyleLink>
        );
      });
    }
  }
  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Home</h2>
      <Wrapper>{handleVideoCardRender(videoInfo)}</Wrapper>
    </>
  );
}
