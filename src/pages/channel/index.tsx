import { useState, useEffect } from 'react';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import {
  getChannelPageInfo,
  getSubscribe,
  subscribe,
  unsubscribe,
} from '../../webApi';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import UserVideoArea from './UserVideoArea';

const Wrapper = styled.div`
  width: 95vw;
  margin: 20px auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Channel(props: any) {
  const { user } = props;
  const [isSubscribe, setIsSubscribe] = useState<unknown>(false);
  const [posting, setPosting] = useState(false);
  const [Info, setInfo] = useState<any>(null);

  const location = useLocation();
  const channelId = location.pathname.slice(9);

  useEffect(() => {
    getChannelPageInfo(channelId).then((res: any) => {
      return setInfo(res);
    });
  }, [channelId]);

  useEffect(() => {
    if (!user) return;
    getSubscribe(user._id).then((res: any) =>
      // eslint-disable-next-line array-callback-return
      res.subscribeList.map((item: any) => {
        if (item._id === channelId) {
          return setIsSubscribe(true);
        }
      })
    );
  }, [user, channelId]);

  useEffect(() => {
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
    }, 1000);
  }, []);

  const handleSubscribeButtonOnClick = (channelId: string) => {
    if (isSubscribe) {
      unsubscribe(channelId).then(() => setIsSubscribe(false));
    } else {
      subscribe(channelId).then(() => setIsSubscribe(true));
    }
  };

  return (
    <div style={{ background: Info && !posting ? '#f9f9f9' : '' }}>
      {!Info || posting ? (
        <CircularProgress style={{ display: 'block', margin: '10vh auto' }} />
      ) : (
        <Wrapper>
          <Header>
            <CardHeader
              style={{ padding: '16px 0' }}
              avatar={
                <Avatar
                  style={{ width: '50px', height: '50px' }}
                  sx={{ bgcolor: red[500] }}
                  aria-label='recipe'
                >
                  {Info.channelInfo.username[0]}
                </Avatar>
              }
              title={
                <Typography
                  component={'span'}
                  noWrap
                  variant='body2'
                  color='text.secondary'
                >
                  {Info.channelInfo.username}
                </Typography>
              }
              subheader={`${Info.channelInfo.subscribeCount} subscribers`}
            />
            <div>
              {user._id !== channelId && (
                <Button
                  onClick={(e) => handleSubscribeButtonOnClick(channelId)}
                  variant='contained'
                  color={isSubscribe ? 'primary' : 'error'}
                  style={{
                    background: isSubscribe ? 'gray' : '',
                  }}
                >
                  {isSubscribe ? 'Unsubscribe' : 'Subscribe'}
                </Button>
              )}
            </div>
          </Header>
          <div>
            <h2>Stats</h2>
            <Typography component={'span'}>
              <Typography component={'span'} style={{ fontWeight: 600 }}>
                Channel Description:
              </Typography>
              <div> {Info.channelInfo.channeldes}</div>
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography component={'span'}>
              <Typography component={'span'} style={{ fontWeight: 600 }}>
                Joined:
              </Typography>
              <div>
                {moment(Info.channelInfo.createAt).format('YYYY-MM-DD')}
              </div>
            </Typography>
          </div>
          <Divider style={{ margin: '10px 0' }} sx={{ borderBottomWidth: 2 }} />
          <div>
            <h2>Videos</h2>
          </div>
          {!Info.videoPlayInfo.length ? (
            <h4>This channel has no videos.</h4>
          ) : (
            <UserVideoArea
              channelVideoList={Info.videoPlayInfo}
              user={user}
              channelId={channelId}
            />
          )}
        </Wrapper>
      )}
    </div>
  );
}
