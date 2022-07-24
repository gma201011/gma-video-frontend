import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { subscribe, unsubscribe } from '../../webApi';
import LoginAlert from './LoginAlert';

interface IProps {
  initStatus: boolean;
  channelId: string;
  user: null | Object;
  isVideoAuthor: boolean;
}

export default function Subscribe(props: IProps) {
  const { initStatus, channelId, user, isVideoAuthor } = props;
  const [subscribeStatus, setSubscribeStatus] = useState(false);
  const [alert, setAlert] = useState(false);

  const alertMessage = {
    title: 'Want to subscribe to this channel?',
    content: 'Sign in to subscribe to this channel.',
  };

  useEffect(() => {
    if (initStatus) {
      setSubscribeStatus(true);
    }
  }, [initStatus]);

  const handleSubscribeButtonOnClick = () => {
    if (!user) return setAlert(true);
    if (subscribeStatus) {
      unsubscribe(channelId);
      setSubscribeStatus(false);
    } else {
      subscribe(channelId);
      setSubscribeStatus(true);
    }
  };

  return (
    <>
      {!isVideoAuthor && (
        <>
          <Button
            onClick={handleSubscribeButtonOnClick}
            variant='contained'
            color={subscribeStatus ? 'primary' : 'error'}
            style={{ background: subscribeStatus ? 'gray' : '' }}
          >
            {subscribeStatus ? 'Unsubscribe' : 'Subscribe'}
          </Button>
          <LoginAlert
            alert={alert}
            setAlert={setAlert}
            alertMessage={alertMessage}
          />
        </>
      )}
    </>
  );
}
