import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { red } from '@mui/material/colors';
import Player from 'aliplayer-react';
import { useLocation } from 'react-router-dom';
import { getVideoPlayInfo, getVideoOperateStatus } from '../../webApi';
import styled from 'styled-components';
import LikeButtons from './LikeButtons';
import Save from './Save';
import Subscribe from './Subscribe';

const StyledTitle = styled.h1`
  margin-left: 10px;
`;

const OperatorWrappr = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex: 0.99;
  justify-content: space-between;
`;

const RightWrapper = styled.div`
  margin: auto 0;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
`;

export default function VideoPlay() {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState<any>('');
  const [config, setConfig] = useState<any>({
    height: '80vh',
    width: '100%',
    autoplay: true,
    controlBarVisibility: 'hover',
    useH5Prism: true,
    preload: true,
  });
  const [operation, setOperation] = useState<any>(null);

  const location = useLocation();
  const videoId = location.pathname.slice(7);

  useEffect(() => {
    getVideoPlayInfo(videoId).then((res: any) => {
      setInfo(res);
      setConfig({ ...config, source: res.playURL });
    });
  }, []);

  useEffect(() => {
    if (user) {
      getVideoOperateStatus(videoId).then((res: any) => {
        setOperation(res);
      });
    }
  }, [user]);

  const handlePlayer = (config: any) => {
    if (config?.source) {
      return (
        <div style={{ width: '100%', height: '80vh', background: 'black' }}>
          <Player config={config} />
        </div>
      );
    }
  };

  return (
    <>
      {config?.source && info && operation ? (
        <>
          {handlePlayer(config)}
          <StyledTitle>{info?.title}</StyledTitle>
          <OperatorWrappr>
            <LeftWrapper>
              <div>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                      {info?.user?.username[0]}
                    </Avatar>
                  }
                  title={
                    <Typography noWrap variant='body2' color='text.secondary'>
                      {info?.user?.username}
                    </Typography>
                  }
                  subheader={
                    info && `${info?.user?.subscribeCount} subscribers`
                  }
                />
              </div>
              <LikeButtons
                likeStatus={operation?.like}
                user={user}
                likeCount={+info?.likeCount}
                dislikeCount={+info?.dislikeCount}
              />
            </LeftWrapper>
            <RightWrapper
              style={{
                margin: 'auto 0',
                marginLeft: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Save saveStatus={operation?.save} />
              <Subscribe
                initStatus={operation?.subscribe}
                channelId={info?.user._id}
                user={user}
              />
            </RightWrapper>
          </OperatorWrappr>
        </>
      ) : (
        <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
      )}
    </>
  );
}
