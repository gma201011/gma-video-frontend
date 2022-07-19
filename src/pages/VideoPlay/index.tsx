import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Player from 'aliplayer-react';
import { useLocation } from 'react-router-dom';
import { getVideoPlayInfo, getVideoOperateStatus } from '../../webApi';
import styled from 'styled-components';
import LikeButtons from './LikeButtons';
import Save from './Save';
import Subscribe from './Subscribe';
import CommentArea from './CommentArea';

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
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const videoId = location.pathname.slice(7);

  const isVideoAuthor = user?._id === info?.user?._id;

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {config?.source && info ? (
        <>
          {handlePlayer(config)}
          <StyledTitle>{info?.title}</StyledTitle>
          <OperatorWrappr>
            <LeftWrapper style={{ flex: isVideoAuthor ? '1' : '0.99' }}>
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
                isVideoAuthor={isVideoAuthor}
              />
            </LeftWrapper>
            <RightWrapper>
              <Save
                user={user}
                saveStatus={operation?.save}
                isVideoAuthor={isVideoAuthor}
              />
              <Subscribe
                initStatus={operation?.subscribe}
                channelId={info?.user?._id}
                user={user}
                isVideoAuthor={isVideoAuthor}
              />
            </RightWrapper>
          </OperatorWrappr>
          <Divider style={{ margin: '10px 0' }} sx={{ borderBottomWidth: 2 }} />
          <CommentArea user={user} videoId={videoId} />
        </>
      ) : (
        <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
      )}
    </>
  );
}
