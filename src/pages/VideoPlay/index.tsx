import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { red } from '@mui/material/colors';
import Player from 'aliplayer-react';
import { useLocation } from 'react-router-dom';
import { getVideoPlayInfo } from '../../webApi';
import styled from 'styled-components';

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

const IconButton = styled(Button)`
  verticalAlign: 'bottom',
  marginRight: '5px'
`;

export default function VideoPlay() {
  const [info, setInfo] = useState<any>('');
  const [config, setConfig] = useState<any>({
    height: '80vh',
    width: '100%',
    autoplay: true,
    controlBarVisibility: 'hover',
    useH5Prism: true,
    preload: true,
  });
  const location = useLocation();
  const videoId = location.pathname.slice(7);

  useEffect(() => {
    getVideoPlayInfo(videoId).then((res: any) => {
      setInfo(res);
      setConfig({ ...config, source: res.playURL });
    });
  }, []);

  const handlePlayer = (config: any) => {
    if (config?.source) {
      return (
        <div style={{ width: '100%', height: '80vh', background: 'black' }}>
          <Player config={config} />
        </div>
      );
    }
  };

  console.log(info);

  return (
    <>
      {config?.source && (
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
              <div style={{ display: 'flex' }}>
                <Typography
                  style={{ margin: 'auto 0' }}
                  variant='body1'
                  color='text.secondary'
                >
                  <Button style={{ color: 'gray' }}>
                    <ThumbUpIcon
                      style={{ verticalAlign: 'bottom', marginRight: '5px' }}
                    />
                    {info?.likeCount}
                  </Button>
                </Typography>
                <Typography
                  style={{ margin: 'auto 0' }}
                  variant='body1'
                  color='text.secondary'
                >
                  <Button style={{ color: 'gray' }}>
                    <ThumbDownIcon
                      style={{ verticalAlign: 'bottom', marginRight: '5px' }}
                    />
                    {info?.dislikeCount}
                  </Button>
                </Typography>
              </div>
            </LeftWrapper>
            <RightWrapper
              style={{
                margin: 'auto 0',
                marginLeft: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                style={{ margin: 'auto 0' }}
                variant='body1'
                color='text.secondary'
              >
                <Button style={{ color: 'gray', marginRight: '20px' }}>
                  <LibraryAddIcon style={{ verticalAlign: 'bottom' }} />
                  save
                </Button>
              </Typography>
              <Button variant='contained' color='error'>
                Subscribe
              </Button>
            </RightWrapper>
          </OperatorWrappr>
        </>
      )}
    </>
  );
}
