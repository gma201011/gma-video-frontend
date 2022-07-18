import { useEffect, useState } from 'react';
import VideoCard from '../../components/VideoCard';
import { getVideoCardInfo } from '../../webApi';
import { NoStyleLink } from '../../components/StyleLink/NoStyleLink';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CardTemplate = styled.div`
  width: 360px;
  height: 305px;
  margin-top: 25px;
`;

export default function HomePage() {
  const [videoInfo, setVideoInfo] = useState<any>('');

  useEffect(() => {
    if (videoInfo) return;
    getVideoCardInfo().then((data: any) => {
      setVideoInfo(data);
    });
  }, [videoInfo]);

  function handleVideoCardRender(info: any) {
    return info?.map((item: any, index: any) => {
      return (
        <NoStyleLink to={`/video/${item._id}`}>
          <VideoCard
            videoCover={item.coverURL}
            videoTitle={item.title}
            userAvatar={item.user.username[0]}
            userName={item.user.username}
            createTime={moment(item.createAt).format('YYYY-MM-DD')}
          />
        </NoStyleLink>
      );
    });
  }

  function handleCardTemplateRender(info: any) {
    if (info.length % 3 === 1) {
      return (
        <>
          <CardTemplate /> <CardTemplate />
        </>
      );
    } else if (info.length % 3 === 2) {
      return <CardTemplate />;
    }
  }

  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Home</h2>
      {!videoInfo ? (
        <CircularProgress style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <Wrapper>
          {handleVideoCardRender(videoInfo)}
          {handleCardTemplateRender(videoInfo)}
        </Wrapper>
      )}
    </>
  );
}
