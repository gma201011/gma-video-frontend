import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NoStyleLink } from '../../components/StyleLink/NoStyleLink';

interface IAlertMessage {
  title: string;
  content: string;
}

interface IProps {
  alert: boolean;
  setAlert: Function;
  alertMessage: IAlertMessage;
}

export default function LoginAlert(props: IProps) {
  const { alert, setAlert, alertMessage } = props;

  const handleClose = () => {
    setAlert(false);
  };

  return (
    <>
      <Dialog
        hideBackdrop
        open={alert}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{alertMessage.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {alertMessage.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <NoStyleLink to='/login'>
            <Button onClick={handleClose}>Sign in</Button>
          </NoStyleLink>
        </DialogActions>
      </Dialog>
    </>
  );
}
