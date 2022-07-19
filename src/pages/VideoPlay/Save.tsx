import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LoginAlert from './LoginAlert';
import { videoSave } from '../../webApi';
import { useLocation } from 'react-router-dom';

interface IProps {
  saveStatus: boolean;
  user: any;
  isVideoAuthor: boolean;
}

export default function Save(props: IProps) {
  const { saveStatus, user, isVideoAuthor } = props;
  const [save, setSave] = useState(false);
  const [alert, setAlert] = useState(false);

  const location = useLocation();
  const videoId = location.pathname.slice(7);

  const alertMessage = {
    title: 'Want to save the video?',
    content: 'Sign in to save the video.',
  };

  useEffect(() => {
    if (saveStatus) {
      setSave(true);
    }
  }, []);

  const handleSaveButtonClick = () => {
    if (!user) return setAlert(true);
    videoSave(videoId);
    setSave(!save);
  };
  return (
    <>
      {!isVideoAuthor && (
        <>
          <Button
            onClick={handleSaveButtonClick}
            style={{ color: save ? '' : 'gray', marginRight: '20px' }}
          >
            <LibraryAddIcon style={{ verticalAlign: 'bottom' }} />
            save
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
