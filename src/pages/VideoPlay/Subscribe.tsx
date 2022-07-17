import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { subscribe, unsubscribe } from '../../webApi';

interface IProps {
  initStatus: boolean;
  channelId: string;
  user: any;
}

export default function Subscribe(props: IProps) {
  const { initStatus, channelId, user } = props;
  const [subscribeStatus, setSubscribeStatus] = useState(false);

  useEffect(() => {
    if (initStatus) {
      setSubscribeStatus(true);
    }
  }, [initStatus]);

  const handleSubscribeButtonOnClick = () => {
    if (!user) return;
    if (subscribeStatus) {
      unsubscribe(channelId);
      setSubscribeStatus(false);
    } else {
      subscribe(channelId);
      setSubscribeStatus(true);
    }
  };

  return (
    <Button
      onClick={handleSubscribeButtonOnClick}
      variant='contained'
      color={subscribeStatus ? 'primary' : 'error'}
      style={{ background: subscribeStatus ? 'gray' : '' }}
    >
      {subscribeStatus ? 'Unsubscribe' : 'Subscribe'}
    </Button>
  );
}
