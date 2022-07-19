import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { unsubscribe } from '../../webApi';

interface IProps {
  dialogOpen: boolean;
  setDialogOpen: Function;
  channelName: any;
  channelId: string;
  subscribeList: any;
  setSubscribeList: Function;
}

export default function UnsubscribeDialog(props: IProps) {
  const {
    dialogOpen,
    setDialogOpen,
    channelName,
    channelId,
    subscribeList,
    setSubscribeList,
  } = props;

  const handleUnsubscribeButtonOnClick = () => {
    unsubscribe(channelId).then((res) => {
      if (res.status === 200) {
        setSubscribeList(
          subscribeList.filter((item: any) => item._id !== channelId)
        );
      }
    });
    setDialogOpen(false);
  };

  const handelCancelButtonOnClick = () => {
    setDialogOpen(false);
  };

  console.log(subscribeList);

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={handelCancelButtonOnClick}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`Unsubscribe from ${channelName}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'gray' }} onClick={handelCancelButtonOnClick}>
            Cancel
          </Button>
          <Button onClick={handleUnsubscribeButtonOnClick}>Unsubscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
