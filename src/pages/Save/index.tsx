import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts';
import CircularProgress from '@mui/material/CircularProgress';
import VideoCard from '../../components/VideoCard';
import SignInScreen from '../../components/SignInScreen';
import { NoStyleLink } from '../../components/StyleLink/NoStyleLink';
import { getSaveVideoList } from '../../webApi';
import styled from 'styled-components';
import moment from 'moment';
import NoSaveScreen from './NoSaveScreen';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  background: #f9f9f9;
`;

const CardTemplate = styled.div`
  width: 360px;
  height: 305px;
  margin-top: 25px;
`;

export default function Save() {
  const { user } = useContext(AuthContext);
  const [likeVideoInfo, setLikeVideoInfo] = useState<any>(null);
  const [posting, setPosting] = useState(true);

  const signInScreenMessage = {
    title: 'Keep track of what you watch',
    content: 'Sign in to see your saved videos',
  };

  useEffect(() => {
    if (!user) return;
    setPosting(true);
    getSaveVideoList().then((res) => {
      setLikeVideoInfo(res);
      setPosting(false);
    });
  }, [user]);

  useEffect(() => {
    if (likeVideoInfo) return;
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
    }, 1000);
  }, []);

  function handleVideoCardRender(info: any) {
    if (!info) return;
    return info?.map((item: any) => {
      return (
        <NoStyleLink key={item.video._id} to={`/video/${item.video._id}`}>
          <VideoCard
            videoCover={item.coverURL}
            videoTitle={item.video.title}
            userAvatar={item?.video?.username[0]}
            userName={item.video.username}
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
      <h2 style={{ marginLeft: '30px' }}>Saved Videos</h2>
      {posting ? (
        <CircularProgress style={{ display: 'block', margin: '10vh auto' }} />
      ) : (
        <>
          {!user ? (
            <SignInScreen message={signInScreenMessage} />
          ) : (
            <>
              {likeVideoInfo && (
                <>
                  {!likeVideoInfo.length ? (
                    <NoSaveScreen />
                  ) : (
                    <Wrapper>
                      {handleVideoCardRender(likeVideoInfo)}
                      {handleCardTemplateRender(likeVideoInfo)}
                    </Wrapper>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
